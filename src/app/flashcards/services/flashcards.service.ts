import { NavigatorService } from '../../home/services/navigator.service';
import { Injectable } from '@angular/core';
import { noteInstance } from '../../notes/interfaces/noteTemplate';

@Injectable({
    providedIn: 'root'
})
export class FlashcardsService {
    flashcards: noteInstance[];
	notesUrl: string
	
    constructor(private navigatorService: NavigatorService) { }

	setFlashcards(flashcards: noteInstance[]){
		this.flashcards = flashcards
	}
	setNotesUrl(notesUrl: string){
		this.notesUrl = notesUrl
	}

	backToNotes(){
		this.navigatorService.moveToNotes(this.notesUrl)
	}
}
