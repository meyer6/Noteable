import { noteInstance } from './interfaces/noteTemplate';
import { notesSetup } from './interfaces/notesSetup';
import { NotesService } from './services/notes.service';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-notes',
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.css'],
    providers: [NotesService]
})
export class NotesComponent {
    @Input() notesSetup: notesSetup = {};

    constructor(public notesService: NotesService){ }

    ngOnInit(){
        this.notesService.setup(this.notesSetup.notes, this.notesSetup.editing)       
    }

    setHoverComponent(){
        this.notesService.interaction.setHoveredComponentPath([-2])
    }
}


// Dashboard
// Sidebar stuff
// Settings
// Sharing

// Ai
// Maths Equations

// Toggle spacing
// Image flashcards
// Page icons
// Numbered list fix
// Subheading handle fix
// Tab
// Enter
// Select box
// Highlight entire note
// Speach to text
// Table
// Columns
