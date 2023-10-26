import { noteInstance } from "./noteTemplate";
import { Notes } from "./notes";

export class Interaction {
    editingStatus: boolean = false;

    dragging: boolean = false;
    startComponentPath: number[] = []
    hoveredComponentPath: number[] = []

    mouseCoords: number[] = [-1, -1]
    componentBeingDragged: noteInstance;

    selectedComponentPath: number[] = []    

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
                if(Math.abs(startMouseCoords[0] - event.clientX) > 15 || Math.abs(startMouseCoords[1] - event.clientY) > 20){
                    this.dragging = true
                }
                this.mouseCoords = [event.clientX, event.clientY]
            }

            document.addEventListener('mousemove', recordMouseCoords)

            document.addEventListener('mouseup', () => {
                if(this.dragging){
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
