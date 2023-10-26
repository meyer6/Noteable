import { NavigatorService } from '../../home/services/navigator.service';
import { Injectable } from '@angular/core';
import { noteInstance } from '../../notes/interfaces/noteTemplate';

@Injectable({
    providedIn: 'root'
})
export class FlashcardsService {
    flashcards: noteInstance[];
	lastUrl: string
	
    constructor(private navigatorService: NavigatorService) { }

	setFlashcards(flashcards: noteInstance[]){
		this.flashcards = flashcards
	}
	setLastUrl(lastUrl: string){
		this.lastUrl = lastUrl
	}

	backToNotes(){
		this.navigatorService.moveToUrl(this.lastUrl)
	}
}
