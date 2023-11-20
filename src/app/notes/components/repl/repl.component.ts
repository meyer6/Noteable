import { Component, Input, Renderer2 } from '@angular/core';
import { noteInstance } from '../../interfaces/noteTemplate';

import { EditorView } from "codemirror"
import { python } from "@codemirror/lang-python";
import { githubLight } from '@uiw/codemirror-theme-github'

import { keymap, highlightSpecialChars, drawSelection, dropCursor, rectangularSelection, crosshairCursor } from "@codemirror/view"
import { defaultHighlightStyle, syntaxHighlighting, indentOnInput, bracketMatching, foldKeymap, indentUnit } from "@codemirror/language"
import { defaultKeymap, history, historyKeymap, indentWithTab } from "@codemirror/commands"
import { searchKeymap, highlightSelectionMatches } from "@codemirror/search"
import { completionKeymap, closeBrackets, closeBracketsKeymap } from "@codemirror/autocomplete"
import { lintKeymap } from "@codemirror/lint"

@Component({
    selector: 'app-repl',
    templateUrl: './repl.component.html',
    styleUrls: ['./repl.component.css'],
})
export class ReplComponent {
	@Input() note: noteInstance;

	// Determines whether or note the output should be shown
	showOutput: boolean = false;

	// Generates a unique id based on the date. Used for HTML id's
	uid: string = Date.now().toString(36) + Math.random().toString(36).substr(2);

	ngAfterViewInit(){
		// Defines a theme
		const myTheme = EditorView.theme({
			"&": {
				border: "none"
			},
			"&.cm-editor.cm-focused": {
				outline: "none"
			}
		});

		const targetElement = document.querySelector('#editor-' + this.uid)!

		// Initalises all the features
		let editor = new EditorView({
			doc: this.note.value,
			extensions: [
				python(),
				highlightSpecialChars(),
				history(),
				drawSelection(),
				dropCursor(),
				indentOnInput(),
				syntaxHighlighting(defaultHighlightStyle, {fallback: true}),
				githubLight,
				myTheme,
				bracketMatching(),
				closeBrackets(),
				rectangularSelection(),
				crosshairCursor(),
				highlightSelectionMatches(),
				indentUnit.of("    "),
				keymap.of([
					...closeBracketsKeymap,
					...defaultKeymap,
					...searchKeymap,
					...historyKeymap,
					...foldKeymap,
					...completionKeymap,
					...lintKeymap,
					indentWithTab
				]),
				EditorView.updateListener.of((e) => {
					this.note.value = e.state.doc.toString();
				})

				// basicSetup,

				// history(),
				// keymap.of([...defaultKeymap, ...historyKeymap]),

				// syntaxHighlighting(defaultHighlightStyle),

			],
			parent: targetElement,
		})

		// If there is an output, render it
		if(this.note.lastOutput != undefined){
			const output = document.getElementById('out-' + this.uid)
			if (output != null){
				this.showOutput = true
				output.innerHTML = this.note.lastOutput
			}
		}
	}

	outputShow(change: boolean){
		this.showOutput = change
		if(change){
			// If the user wants an output, then run the code
			const output = document.getElementById("out-" + this.uid)
			if(output != null){
				output.innerHTML = 'Loading...'
			}

			this.importModules().then(() => {
				this.runCode()
			})
		}else{
			this.note.lastOutput = undefined
		}
	}

	async importModules(){
		// Creates a div
		// Sets it's html to run the following python code
		// This code imports libraries, and once done updates a seperate 
		// div to indicate to the programme that it is done
		const importsDiv = document.createElement("div")
		importsDiv.innerHTML =`<py-script>
async def main():
	parent = document.getElementById("imports-state-${this.uid}")
	parent.innerHTML = "Loading"

	await micropip.install(${JSON.stringify(this.note.value.split('\n').map((code: string) => {
		// Checks every line in the code, if it has inport then it moves on
		if(code.replace('import', '') != code){
			// Splits the import up into its individual words
			const splitCode = code.split(' ') 

			// Determines the form of the import 
			if(splitCode.indexOf('from') != -1){
				// "from x import y"
				return `${splitCode[splitCode.indexOf('from') + 1].split('.')[0]}`
			}

			// "#import x"
			return `${splitCode[splitCode.indexOf('import') + 1].split('.')[0]}`
		}
		return ''
	// Removes any empty imports
	}).filter((value: string) => {return value != ''}))})

	parent.innerHTML = "Done"

asyncio.create_task(main())
		
</py-script>`

		// Inserts the component created above into the HTML
		const imports = importsDiv.firstElementChild
		const importsParent = document.getElementById("imports-" + this.uid)
		if(importsParent != null && imports != null){
			importsParent.appendChild(imports);
			// Runs the code
			(imports as any).evaluate();
		}

		const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
		let first = true
		// Checks every 0.5s to see if the libraries have imported
		while (first ||(document.getElementById("imports-state-" + this.uid) as any).innerHTML == "Loading"){
			first = false
			await delay(500)
		}
	}

	runCode(){
		// Create HTML element with the code in it
		const pyScriptDiv = document.createElement("div");
		pyScriptDiv.innerHTML = `<py-script output="out-${this.uid}">\n${this.note.value}\n</py-script>`;
		const pyScript = pyScriptDiv.firstElementChild;

		// Insert it into the document
		const pyScriptParent = document.getElementById("out-" + this.uid)
		if(pyScriptParent != null && pyScript != null){
			pyScriptParent.innerHTML = ""

			pyScriptParent.appendChild(pyScript);
			
			// Run the code and add the output to the data of the note
			(pyScript as any).evaluate().then(() => {
				this.note = {...this.note, ...{extraData: {lastOutput: pyScriptParent.innerHTML}}}
			})
		}
	}
}