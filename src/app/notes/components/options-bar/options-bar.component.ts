import { NotesInteractionService } from '../../services/notesInteraction.service';
import { Component } from '@angular/core';
import { NotesCrudService } from '../../services/notes-crud.service';

@Component({
    selector: 'app-options-bar',
    templateUrl: './options-bar.component.html',
    styleUrls: ['./options-bar.component.css']
})
export class OptionsBarComponent {
    pinned: boolean = false;
    option: 'Insert' | 'Styling' = 'Insert';
    optionsOpen: boolean= false;

	insertOptions: any[][] = [
		["Heading 1", "https://www.notion.so/images/blocks/header.57a7576a.png", "subHeading", {subHeadingType: 1}],
		["Heading 2", "https://www.notion.so/images/blocks/subheader.9aab4769.png", "subHeading", {subHeadingType: 2}],
		["Heading 3", "https://www.notion.so/images/blocks/subsubheader.d0ed0bb3.png", "subHeading", {subHeadingType: 3}],
		["Separator", ""],
		["Text", "https://www.notion.so/images/blocks/text/en-US.png", "text"],
		["Cloze", "assets/cloze.png"],
		["Separator", ""],
		["Bulleted List", "https://www.notion.so/images/blocks/bulleted-list.0e87e917.png", "bulletPoint"],
		["Numbered List", "https://www.notion.so/images/blocks/numbered-list.0406affe.png", "numberedPoint"],
		["To-Do List", "https://www.notion.so/images/blocks/to-do.f8d20542.png", "toDoList", {open: false}],
		["Toggle", "https://www.notion.so/images/blocks/toggle.5e462b2a.png", "toggle", {open: false}],
		["Separator", ""],
		["REPL", "https://www.notion.so/images/blocks/code.a8b201f4.png", "repl"],
		["Divider", "https://www.notion.so/images/blocks/divider.210d0faf.png", "divider"],
	];

	stylingOptions: string[][] = [
		["B", "font-weight: 600;", "bold"], 
		["i", "font-style: italic", "italic"], 
		["U", "text-decoration: underline", "underline"], 
		["S", "text-decoration: line-through", "strikeThrough"]
	];

	stylingColours: string[][] = [
		["Default", "#37352F", "rgba(0,0,0,0)"],
		["Grey", "#787774", "#F1F1EF"],
		["Brown", "#9F6B53", "#F4EEEE"],
		["Orange", "#D9730D", "#FBECDD"],
		["Yellow", "#CB912F", "#FBF3DB"],
		["Green", "#448361", "#EDF3EC"],
		["Blue", "#337EA9", "#E7F3F8"],
		["Purple", "#9065B0", "#F6F3F9"],
		["Pink", "#C14C8A", "#FAF1F5"],
		["Red", "#D44C47", "#FDEBEC"]
	];

	constructor(private notesCrudService: NotesCrudService, private notesInteractionService: NotesInteractionService){}

	styleText(style: string, value: string = ''){
		document.execCommand(style, false, value)
	}

	insertComponent(component: any[]){
		if(component[0] == 'Cloze'){
			const selection = window.getSelection()
			if(selection){
				document.execCommand('insertHTML', false, '<span class="cloze">' + selection.toString() + '</span>')
			}
		}else{
			this.notesCrudService.insertNoteAtPath(this.notesInteractionService.focusedComponentPath, {
				...{
					type: component[2],
					value: '',
					content: component[2] == 'toggle' ? [		
						{
							type: 'text',
							value: '',
							content: []
						}
					] : []
				}, ...(component[3] == undefined ? null : component[3])
			})
		}
	}
}
