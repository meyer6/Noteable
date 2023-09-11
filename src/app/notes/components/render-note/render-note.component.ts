import { NavigatorService } from 'src/app/home/services/navigator.service';
import { RandomNoteFunctionsService } from './../../services/random-note-functions.service';
import { NotesInteractionService } from '../../services/notesInteraction.service';
import { NotesService } from '../../services/notes.service';
import { Component, Input } from '@angular/core';
import { noteInstance } from '../../interfaces/noteTemplate';
import { NotesCrudService } from '../../services/notes-crud.service';
import { FlashcardDataService } from '../../services/flashcard-data.service';

@Component({
    selector: 'app-render-note',
    templateUrl: './render-note.component.html',
    styleUrls: ['./render-note.component.css']
})
export class RenderNoteComponent {
	@Input() note: noteInstance;
	@Input() notePath: number[];

	noteValue: string

	confidenceColour?: string;

	indentLevel?: number;
	numberedListValue?: string;

	pageTitle?: string = 'Loading...';

    constructor(
		public navigatorService: NavigatorService,
		public notesInteractionService: NotesInteractionService,
		public notesService: NotesService,
		private notesCrudService: NotesCrudService, 
		private randomNoteFunctions: RandomNoteFunctionsService,
		private flashcardDataService: FlashcardDataService,
	){}

	ngOnInit(){
		this.noteValue = this.note.value

		if(this.note.type == 'numberedPoint'){
			this.getNumberedListValue()
		}else if(this.note.type == 'bulletPoint'){
			this.indentLevel = this.notesCrudService.getListIndentLevel(this.notePath, 'bulletPoint')
		}
		else if(this.note.type == 'page' || this.note.type == 'pageToggle'){
			this.notesService.getTitleFromPageId(this.note.value)
			.then((title: string) => {
				this.pageTitle = title
			})
		}

		if(this.note.confidenceLevel != undefined){
			const confidence = this.flashcardDataService.getFinalConfidence(this.note)
			
			const diff = Math.min(196, Math.floor(confidence / 4.22 * 196))
			let r = 116
			let g = 214
			if(diff >= 99){
				r = 214
				g = 116 + diff - 98
			}else{
				r = 214 - diff
			}
			// const confidenceColours = ['#b6d7a8', '#bcd9a6', '#c2dba4', '#c9dda2', '#cfdea0', '#d7e09e', '#dee19d', '#e6e29b', '#eee39a', '#f7e499', 
			// '#ffe599', '#ffe299', '#ffdf99', '#ffdd99', '#feda99', '#fed79a', '#fdd59a', '#fcd29b', '#fbd09b', '#facd9b',
			// '#f9cb9c', '#f9c69a', '#f9c099', '#f8bb98', '#f7b697', '#f6b197', '#f4ac96', '#f2a797', '#f0a297', '#ed9d98', '#ea9999']

			this.confidenceColour = `rgb(${r}, ${g}, 116)`
		}
	}

	ngAfterViewInit() {
		this.randomNoteFunctions.addMathsEquations()
	}

	// moveCaret(el: any, pos: number) {
	// 	// Loop through all child nodes
	// 	for(var node of (el as any).childNodes){
	// 		if(node.nodeType == 3){ // we have a text node
	// 			if(node.length >= pos){
	// 				// finally add our range
	// 				var range = document.createRange(),
	// 				sel = window.getSelection();
	// 				range.setStart(node,pos);
	// 				range.collapse(true);
	// 				(sel as any).removeAllRanges();
	// 				(sel as any).addRange(range);
	// 				return -1; // we are done
	// 			}else{
	// 				pos -= node.length;
	// 			}
	// 		}else{
	// 			pos = this.moveCaret(node,pos);
	// 			if(pos == -1){
	// 				return -1; // no need to finish the for loop
	// 			}
	// 		}
	// 	}
	// 	return pos; 
	
	// 	// const selection = window.getSelection();
	// 	// if (selection != null && selection.rangeCount > 0) {
	// 	// 	const node = selection.focusNode;
	// 	// 	if((node as any).length < selection.focusOffset + offset){

	// 	// 	}else{
	// 	// 		selection.collapse(node, Math.max(0, selection.focusOffset + offset));
	// 	// 	}
	// 	// }
	// }
	// getCaretPosition(element: HTMLElement) {
	// 	const range = (window.getSelection() as any).getRangeAt(0);
	// 	const clonedRange = range.cloneRange();
	// 	clonedRange.selectNodeContents(element);
	// 	clonedRange.setEnd(range.endContainer, range.endOffset);
	
	// 	return clonedRange.toString().length;
	// }

	updateValue(event: Event){
		this.note.value = (event.target as HTMLElement).innerHTML
	}

	delete(){
		this.notesCrudService.deleteNoteAtPath(this.notePath)
	}

	getNumberedListValue(){
		const index = this.notesCrudService.getListNumber(this.notePath, 'numberedPoint')
		const indentLevel = this.notesCrudService.getListIndentLevel(this.notePath, 'numberedPoint')

		if(indentLevel == 0){
			this.numberedListValue = this.randomNoteFunctions.convertNumToChar(index);
		}else if (indentLevel == 1){
			this.numberedListValue = this.randomNoteFunctions.convertNumToRoman(index + 1);
		}else{
			this.numberedListValue = (index + 1).toString()
		}
	}

	imageResize(event: MouseEvent){
		let lastX = event.clientX

		const resize = (event: MouseEvent) => {
			if(this.note.width != undefined){
				this.note.width = Math.max(100, this.note.width - lastX + event.clientX)
				lastX = event.clientX
				event.preventDefault()
			}
		}

		document.addEventListener('mousemove', resize)
        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', resize)
        }, {once: true})
	}

	paste(event: ClipboardEvent){
		let imagePasted = false

		// https://stackoverflow.com/questions/6333814/how-does-the-paste-image-from-clipboard-functionality-work-in-gmail-and-google-c/6338207#6338207
		var items: any = event.clipboardData?.items;
		for (let index in items) {
			let item = items[index];
			if (item.kind === 'file') {

				let blob: any = item.getAsFile();
				let reader = new FileReader();

				reader.onload = (event) => {
					let url: any = event.target?.result
					this.notesCrudService.insertNoteAtPath(this.notePath, {
						type: 'image',
						value: url,
						width: 400,
						content: []
					});	
					imagePasted = true
				}; 

				reader.readAsDataURL(blob);
			}
		}
		if(imagePasted){
			event.preventDefault()
		}else if(!event.clipboardData?.getData('text/html').includes('caret-color: rgb(55, 53, 47)')){
			let text = event.clipboardData?.getData('text/plain');

			document.execCommand("insertHTML", false, text);
			event.preventDefault()
		}
    }
}
