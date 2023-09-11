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
	showOutput: boolean = false;

	uid: string = Date.now().toString(36) + Math.random().toString(36).substr(2);

	ngAfterViewInit(){
		const myTheme = EditorView.theme({
			"&": {
				border: "none"
			},
			"&.cm-editor.cm-focused": {
				outline: "none"
			}
		});

		const targetElement = document.querySelector('#editor-' + this.uid)!
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
		const importsDiv = document.createElement("div")
		importsDiv.innerHTML =`<py-script>
async def main():
	parent = document.getElementById("imports-state-${this.uid}")
	parent.innerHTML = "Loading"

	await micropip.install(${JSON.stringify(this.note.value.split('\n').map((code: string) => {
		if(code.replace('import', '') != code){
			const splitCode = code.split(' ') 
			if(splitCode.indexOf('from') != -1){
				return `${splitCode[splitCode.indexOf('from') + 1].split('.')[0]}`
			}
			return `${splitCode[splitCode.indexOf('import') + 1].split('.')[0]}`
		}
		return ''
	}).filter((value: string) => {return value != ''}))})

	parent.innerHTML = "Done"

asyncio.create_task(main())
		
</py-script>`

		const imports = importsDiv.firstElementChild
		const importsParent = document.getElementById("imports-" + this.uid)
		if(importsParent != null && imports != null){
			importsParent.appendChild(imports);
			(imports as any).evaluate();
		}

		const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
		let first = true
		while (first ||(document.getElementById("imports-state-" + this.uid) as any).innerHTML == "Loading"){
			first = false
			await delay(500)
		}
	}

	runCode(){
		const pyScriptDiv = document.createElement("div");
		pyScriptDiv.innerHTML = `<py-script output="out-${this.uid}">\n${this.note.value}\n</py-script>`;
		const pyScript = pyScriptDiv.firstElementChild;

		const pyScriptParent = document.getElementById("out-" + this.uid)
		if(pyScriptParent != null && pyScript != null){
			pyScriptParent.innerHTML = ""

			pyScriptParent.appendChild(pyScript);
			(pyScript as any).evaluate().then(() => {
				this.note = {...this.note, ...{extraData: {lastOutput: pyScriptParent.innerHTML}}}
			})
		}
	}
}