import { Component, Input } from '@angular/core';
import { noteInstance } from '../../interfaces/noteTemplate';
import { NotesService } from '../../services/notes.service';

@Component({
    selector: 'app-notes-recurse',
    templateUrl: './notes-recurse.component.html',
    styleUrls: ['./notes-recurse.component.css']
})
export class NotesRecurseComponent {
    @Input() notes: noteInstance[];
    @Input() notePath: number[] = []

    constructor(private notesService: NotesService){}

    checkPlaceholderState(index: number){
        const dragging = this.notesService.interaction.dragging
        const hoveredOver = this.notePath.concat([index]).toString() == this.notesService.interaction.hoveredComponentPath.toString()
        return dragging && hoveredOver
    }
    
    startDragging(index: number, event: MouseEvent){
        this.notesService.interaction.startDragging(this.notePath.concat([index]), event)
    }

    setHoverComponent(index: number){
        this.notesService.interaction.setHoveredComponentPath(this.notePath.concat([index]))
    }

    selectComponent(index: number){
        this.notesService.interaction.selectComponent(this.notePath.concat([index]))
    }
}
