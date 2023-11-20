import { Component, Input } from '@angular/core';
import { noteInstance } from '../../interfaces/noteTemplate';
import { NotesService } from '../../services/notes.service';

@Component({
    selector: 'app-notes-recurse',
    templateUrl: './notes-recurse.component.html',
    styleUrls: ['./notes-recurse.component.css']
})
export class NotesRecurseComponent {
    // Takes the current note and the note path
    @Input() notes: noteInstance[];
    @Input() notePath: number[] = []

    constructor(private notesService: NotesService){}

    checkPlaceholderState(index: number){
        // Checks whether or not the notes placeholder should be visible or not
        const dragging = this.notesService.interaction.dragging
        const hoveredOver = this.notePath.concat([index]).toString() == this.notesService.interaction.hoveredComponentPath.toString()
        return dragging && hoveredOver
    }
    
    // If the handle is clicked it initates the dragging logic
    startDragging(index: number, event: MouseEvent){
        this.notesService.interaction.startDragging(this.notePath.concat([index]), event)
    }

    // Updates the hover component
    setHoverComponent(index: number){
        this.notesService.interaction.setHoveredComponentPath(this.notePath.concat([index]))
    }

    // Selects the component
    selectComponent(index: number){
        this.notesService.interaction.selectComponent(this.notePath.concat([index]))
    }
}
