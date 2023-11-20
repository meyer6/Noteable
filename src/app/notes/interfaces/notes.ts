import { noteInstance } from "./noteTemplate";

export class Notes {
    // Stores the notes
    value: noteInstance[]

    constructor(notes: noteInstance[]){
        this.value = notes
    }

    setNotes(notes: noteInstance[]){
        this.value = notes
    }
    getNotes(){
        return this.value
    }

    // Returns the note at a given location
    getNoteAtPath(path: number[]){
        let currentNote = this.value[path[0]]
        for(let i = 1; i < path.length; i++){
            currentNote = currentNote.content[path[i]]
        }
        return currentNote
    }

    // Deletes the note at a given location
    deleteNoteAtPath(path: number[]){
        let currentNotes = this.value
        for(let i = 0; i < path.length - 1; i++){
            currentNotes = currentNotes[path[i]].content
        }
        currentNotes.splice(path[path.length - 1], 1)
    }

    // Inserts a note at a given location
    insertNoteAtPath(path: number[], note: noteInstance){
        let currentNotes = this.value
        for(let i = 0; i < path.length - 1; i++){
            currentNotes = currentNotes[path[i]].content
        }
        currentNotes.splice(path[path.length - 1] + 1, 0, note)
    } 

    // Moves a note from one location to another
	moveNote(oldPath: number[], newPath: number[]){
        if(newPath[0] != -2 && newPath.slice(0, oldPath.length).toString() != oldPath.toString()){
            const note = this.getNoteAtPath(oldPath)
            this.deleteNoteAtPath(oldPath)

            // Gets new location
            let currentNote = this.value
            for(let i = 0; i < newPath.length - 1; i++){

                // If the deleted note is before the new one, we must subtract 1 from the path
                if(newPath[i] > oldPath[i] && i == oldPath.length - 1){
                    currentNote = currentNote[newPath[i] - 1].content
                }else{
                    currentNote = currentNote[newPath[i]].content
                }
            }

            const i = newPath.length - 1
            // If the deleted note is before the new one, we must subtract 1 from the path
            if(newPath[i] > oldPath[i] && i == oldPath.length - 1){
                currentNote.splice(newPath[i], 0, note)
            }else{
                currentNote.splice(newPath[i] + 1, 0, note)
            }
        }
    }

    // Calculates the list indent level of a list
	getListIndent(path: number[], listType: string){
        let indentLevel = 2;
        // Goes back until it is no longer in the list
        for(let i = path.length - 2; i > -1; i--){
            if(this.getNoteAtPath(path.slice(0, i + 1)).type == listType){
                indentLevel++
            }
        }

		// let indentLevel = -1;
		// let index = path.length + 1
		// let current = this.value[path[0]]
		// do {
		// 	index--
		// 	indentLevel = (indentLevel + 1) % 3
		// 	current = this.value[path[0]]
		// 	for(let i = 1; i < index; i++){
		// 		current = current.content[path[i]]
		// 	}
		// } while(index >= 0 && current.type == listType)
		return indentLevel % 3
	}

    // Calculates the list number of a list item
	getListNumber(path: number[], listType: string){
        // Gets all note at the same level
		let current = this.value
		for(let i = 0; i < path.length - 1; i++){
			current = current[path[i]].content
		}

        // Goes back to see how many list items are before it
		let index = path[path.length - 1]
		while(index != 0 && current[index - 1].type == listType){
			index--
		}
		return path[path.length - 1] - index
	}
}