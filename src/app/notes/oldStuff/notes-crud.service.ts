import { Injectable } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { noteInstance } from '../interfaces/noteTemplate';

@Injectable({
    providedIn: 'root'
})
export class NotesCrudService {
    // constructor(private notesService: NotesService) {}

    // getNoteAtPath(path: number[]){
    //     let currentNote = this.notesService.notes[path[0]]
    //     for(let i = 1; i < path.length; i++){
    //         currentNote = currentNote.content[path[i]]
    //     }
    //     return currentNote
    // }

    // deleteNoteAtPath(path: number[]){
    //     let currentNotes = this.notesService.notes
    //     for(let i = 0; i < path.length - 1; i++){
    //         currentNotes = currentNotes[path[i]].content
    //     }
    //     currentNotes.splice(path[path.length - 1], 1)
    // }

    // insertNoteAtPath(path: number[], note: noteInstance){
    //     let currentNotes = this.notesService.notes
    //     for(let i = 0; i < path.length - 1; i++){
    //         currentNotes = currentNotes[path[i]].content
    //     }
    //     currentNotes.splice(path[path.length - 1] + 1, 0, note)
    // } 

	// moveNote(oldPath: number[], newPath: number[]){
    //     if(newPath[0] != -2 && newPath.slice(0, oldPath.length).toString() != oldPath.toString()){
    //         const note = this.getNoteAtPath(oldPath)
    //         this.deleteNoteAtPath(oldPath)

    //         let currentNote = this.notesService.notes
    //         for(let i = 0; i < newPath.length - 1; i++){
    //             if(newPath[i] > oldPath[i] && i == oldPath.length - 1){
    //                 currentNote = currentNote[newPath[i] - 1].content
    //             }else{
    //                 currentNote = currentNote[newPath[i]].content
    //             }
    //         }

    //         const i = newPath.length - 1
    //         if(newPath[i] > oldPath[i] && i == oldPath.length - 1){
    //             currentNote.splice(newPath[i], 0, note)
    //         }else{
    //             currentNote.splice(newPath[i] + 1, 0, note)
    //         }
    //     }
    // }

	// getListIndentLevel(path: number[], listType: string){
	// 	let indentLevel = -1;
	// 	let index = path.length + 1
	// 	let current = this.notesService.notes[path[0]]
	// 	do {
	// 		index--
	// 		indentLevel = (indentLevel + 1) % 3
	// 		current = this.notesService.notes[path[0]]
	// 		for(let i = 1; i < index; i++){
	// 			current = current.content[path[i]]
	// 		}
	// 	} while(index >= 0 && current.type == listType)
	// 	return indentLevel
	// }

	// getListNumber(path: number[], listType: string){
	// 	let current = this.notesService.notes
	// 	for(let i = 0; i < path.length - 1; i++){
	// 		current = current[path[i]].content
	// 	}
	// 	let index = path[path.length - 1]
	// 	while(index != 0 && current[index - 1].type == listType){
	// 		index--
	// 	}
	// 	return path[path.length - 1] - index
	// }
}
