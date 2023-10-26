import { noteInstance } from "./noteTemplate";

export class Notes {
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

    getNoteAtPath(path: number[]){
        let currentNote = this.value[path[0]]
        for(let i = 1; i < path.length; i++){
            currentNote = currentNote.content[path[i]]
        }
        return currentNote
    }
    deleteNoteAtPath(path: number[]){
        let currentNotes = this.value
        for(let i = 0; i < path.length - 1; i++){
            currentNotes = currentNotes[path[i]].content
        }
        currentNotes.splice(path[path.length - 1], 1)
    }
    insertNoteAtPath(path: number[], note: noteInstance){
        let currentNotes = this.value
        for(let i = 0; i < path.length - 1; i++){
            currentNotes = currentNotes[path[i]].content
        }
        currentNotes.splice(path[path.length - 1] + 1, 0, note)
    } 
	moveNote(oldPath: number[], newPath: number[]){
        if(newPath[0] != -2 && newPath.slice(0, oldPath.length).toString() != oldPath.toString()){
            const note = this.getNoteAtPath(oldPath)
            this.deleteNoteAtPath(oldPath)

            let currentNote = this.value
            for(let i = 0; i < newPath.length - 1; i++){
                if(newPath[i] > oldPath[i] && i == oldPath.length - 1){
                    currentNote = currentNote[newPath[i] - 1].content
                }else{
                    currentNote = currentNote[newPath[i]].content
                }
            }

            const i = newPath.length - 1
            if(newPath[i] > oldPath[i] && i == oldPath.length - 1){
                currentNote.splice(newPath[i], 0, note)
            }else{
                currentNote.splice(newPath[i] + 1, 0, note)
            }
        }
    }

	getListIndent(path: number[], listType: string){
        let indentLevel = 2;
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
	getListNumber(path: number[], listType: string){
		let current = this.value
		for(let i = 0; i < path.length - 1; i++){
			current = current[path[i]].content
		}

        
		let index = path[path.length - 1]
		while(index != 0 && current[index - 1].type == listType){
			index--
		}
		return path[path.length - 1] - index
	}
}