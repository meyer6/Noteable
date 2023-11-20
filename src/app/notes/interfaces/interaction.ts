import { noteInstance } from "./noteTemplate";
import { Notes } from "./notes";

export class Interaction {
    editingStatus: boolean = false;

    // Determines whether a note is being moved
    dragging: boolean = false;
    // Determines the dragged note
    startComponentPath: number[] = []
    // The place the note will go if dropped
    hoveredComponentPath: number[] = []

    mouseCoords: number[] = [-1, -1]
    // Stores the note being dragged
    componentBeingDragged: noteInstance;

    // Stores the path of a selected(i.e click on handle) note
    selectedComponentPath: number[] = []    

    // Stores the path of the note the user is currently writing in
    focusedComponentPath: number[] = [0]

    constructor(private notes: Notes, editingStatus?: boolean) { 
        this.notes = notes;

        if(editingStatus) this.editingStatus = editingStatus
    }

    setEditingStatus(editingStatus: boolean){
        this.editingStatus = editingStatus
    }

    startDragging(notePath: number[], event: MouseEvent){
        if (this.editingStatus){
            
            this.startComponentPath = notePath
            this.componentBeingDragged = this.notes.getNoteAtPath(notePath)        
            
            const startMouseCoords = [event.clientX, event.clientY]

            const recordMouseCoords = (event: MouseEvent) => {
                // If the mouse is outside a certain range of the handle then start dragging
                // Otherwise it is a click
                if(Math.abs(startMouseCoords[0] - event.clientX) > 15 || Math.abs(startMouseCoords[1] - event.clientY) > 20){
                    this.dragging = true
                }
                this.mouseCoords = [event.clientX, event.clientY]
            }

            document.addEventListener('mousemove', recordMouseCoords)

            document.addEventListener('mouseup', () => {
                if(this.dragging){
                    // Moves the note after dragging
                    this.notes.moveNote(this.startComponentPath, this.hoveredComponentPath)
                }
                this.dragging = false;
                
                document.removeEventListener('mousemove', recordMouseCoords)
            }, {once: true})
        }
    }

    setHoveredComponentPath(notePath: number[]){
        this.hoveredComponentPath = notePath
    }

    selectComponent(path: number[]){
        if (this.editingStatus){

            this.selectedComponentPath = path
            // Unselects the component when clicked away from
            document.addEventListener('mousedown', () => {
                this.selectedComponentPath = []
            }, {once: true})
        }
    }

    setFocusedComponentPath(notePath: number[]){
        if (this.editingStatus){
            this.focusedComponentPath = notePath
        }
    }
}
