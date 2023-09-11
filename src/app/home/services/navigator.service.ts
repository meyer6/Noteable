import { NavigationEnd, Router } from '@angular/router';
import { FlashcardsService } from '../../flashcards/services/flashcards.service';
import { Injectable, Injector } from '@angular/core';
import { NotesService } from '../../notes/services/notes.service';
import { noteInstance } from '../../notes/interfaces/noteTemplate';

@Injectable({
    providedIn: 'root'
})
export class NavigatorService {
	pageContent: string = 'Notes';

    constructor(private injector: Injector, private router: Router) { 
		router.events.subscribe((val) => {
			if(val instanceof NavigationEnd){
				this.pageContent = val.url.split('/')[1]

				if(this.pageContent == 'Notes'){
					this.injector.get(NotesService).startUp()
				}
			}
		})
		this.moveToNotes('-Nd5uHU-H97hrfUZJw28')
	}

    moveToNotes(notesId: string){
		this.router.navigate([`/refresh`], { skipLocationChange: true }).then(() => {
			this.router.navigate([`Notes/${notesId}`])
		})
	}
	moveToChildNotes(notesId: string){
		const url = this.router.url
		this.router.navigate([`/refresh`], { skipLocationChange: true }).then(() => {
			this.router.navigate([`${url}/${notesId}`])
		})
	}

	moveToFlashcards(flashcards: noteInstance[]){
		this.injector.get(FlashcardsService).setFlashcards(flashcards)
		this.injector.get(FlashcardsService).setNotesUrl(this.router.url.replace('/Notes/', ''))
		this.router.navigate([`/refresh`], { skipLocationChange: true }).then(() => {
			this.router.navigate(['Flashcards'])
		})
	}

	moveToDashboard(){
		this.router.navigate([`/refresh`], { skipLocationChange: true }).then(() => {
			this.router.navigate(['Dashboard'])
		})	
	}

	moveToSettings(){
		this.router.navigate([`/refresh`], { skipLocationChange: true }).then(() => {
			this.router.navigate(['Settings'])
		})	
	}
}
