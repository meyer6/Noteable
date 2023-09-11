import { Injectable } from '@angular/core';
import { noteInstance } from '../interfaces/noteTemplate';
import { NotesCrudService } from './notes-crud.service';

@Injectable({
    providedIn: 'root'
})
export class NotesInteractionService {
    dragging: boolean = false;
    mouseCoords: number[] = [-1, -1]

    startComponentPath: number[] = []
    componentBeingDragged: noteInstance
    currentHoveredComponentPath: number[] = []

    selectedComponentPath: number[] = []    

    focusedComponentPath: number[] = [0]

    constructor(private notesCrudService: NotesCrudService) { }

    startDragging(notePath: number[], event: MouseEvent){
        const startMouseCoords = [event.clientX, event.clientY]
        let movedEnough = false

        const recordMouseCoords = (event: MouseEvent) => {
            if(!movedEnough && (Math.abs(startMouseCoords[0] - event.clientX) > 15 || Math.abs(startMouseCoords[1] - event.clientY) > 20)){
                this.dragging = true
                this.startComponentPath = notePath
                this.componentBeingDragged = this.notesCrudService.getNoteAtPath(notePath)
                this.mouseCoords = [event.clientX, event.clientY]
                movedEnough = true  
            }else if(movedEnough){
                this.mouseCoords = [event.clientX, event.clientY]
            }
        }

        document.addEventListener('mousemove', recordMouseCoords)

        document.addEventListener('mouseup', () => {
            this.dragging = false;
            if(movedEnough){
                this.notesCrudService.moveNote(this.startComponentPath, this.currentHoveredComponentPath)
            }
            document.removeEventListener('mousemove', recordMouseCoords)
        }, {once: true})
    }

    setCurrentHoveredComponent(notePath: number[]){
        this.currentHoveredComponentPath = notePath
    }

    selectComponent(path: number[]){
        this.selectedComponentPath = path
        document.addEventListener('mousedown', () => {
            this.selectedComponentPath = []
        }, {once: true})
    }
}
