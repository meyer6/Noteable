import { NotesService } from './services/notes.service';
import { Component } from '@angular/core';
import { NotesInteractionService } from './services/notesInteraction.service';

@Component({
    selector: 'app-notes',
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.css']
})
export class NotesComponent {
    constructor(
        public notesInteractionService: NotesInteractionService, 
        public notesService: NotesService
    ){}

    setHoverComponent(){
        this.notesInteractionService.setCurrentHoveredComponent([-2])
    }
}


// Dashboard
// Sidebar stuff
// Settings
// Sharing

// Ai
// Maths Equations

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
