import { Injectable } from '@angular/core';
import { noteInstance } from '../interfaces/noteTemplate';
import { NotesService } from '../services/notes.service';

@Injectable()
export class NotesInteractionService {
    // dragging: boolean = false;
    // startComponentPath: number[] = []
    // hoveredComponentPath: number[] = []

    // mouseCoords: number[] = [-1, -1]
    // componentBeingDragged: noteInstance

    // selectedComponentPath: number[] = []    

    // focusedComponentPath: number[] = [0]

    // constructor(private notesService: NotesService) { }

    // startDragging(notePath: number[], event: MouseEvent){
    //     this.startComponentPath = notePath
    //     this.componentBeingDragged = this.notesService.notes.getNoteAtPath(notePath)        
        
    //     const startMouseCoords = [event.clientX, event.clientY]

    //     const recordMouseCoords = (event: MouseEvent) => {
    //         if(Math.abs(startMouseCoords[0] - event.clientX) > 15 || Math.abs(startMouseCoords[1] - event.clientY) > 20){
    //             this.dragging = true
    //         }
    //         this.mouseCoords = [event.clientX, event.clientY]
    //     }

    //     document.addEventListener('mousemove', recordMouseCoords)

    //     document.addEventListener('mouseup', () => {
    //         if(this.dragging){
    //             this.notesService.notes.moveNote(this.startComponentPath, this.hoveredComponentPath)
    //         }
    //         this.dragging = false;
            
    //         document.removeEventListener('mousemove', recordMouseCoords)
    //     }, {once: true})
    // }

    // setHoveredComponentPath(notePath: number[]){
    //     this.hoveredComponentPath = notePath
    // }

    // selectComponent(path: number[]){
    //     this.selectedComponentPath = path
    //     document.addEventListener('mousedown', () => {
    //         this.selectedComponentPath = []
    //     }, {once: true})
    // }
}
