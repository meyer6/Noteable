import { Component, Input } from '@angular/core';
import { noteInstance } from '../../interfaces/noteTemplate';
import { NotesInteractionService } from '../../services/notesInteraction.service';

@Component({
    selector: 'app-notes-recurse',
    templateUrl: './notes-recurse.component.html',
    styleUrls: ['./notes-recurse.component.css']
})
export class NotesRecurseComponent {
    @Input() notes: noteInstance[];
    @Input() notePath: number[] = []

    constructor(private notesInteractionService: NotesInteractionService){}

    checkPlaceholderState(index: number){
        const dragging = this.notesInteractionService.dragging
        const hoveredOver = this.notePath.concat([index]).toString() == this.notesInteractionService.currentHoveredComponentPath.toString()
        return dragging && hoveredOver
    }
    
    startDragging(index: number, event: MouseEvent){
        this.notesInteractionService.startDragging(this.notePath.concat([index]), event)
    }

    setHoverComponent(index: number){
        this.notesInteractionService.setCurrentHoveredComponent(this.notePath.concat([index]))
    }

    selectComponent(index: number){
        this.notesInteractionService.selectComponent(this.notePath.concat([index]))
    }
}
