import { NavigationEnd, Router } from '@angular/router';
import { FlashcardsService } from '../../flashcards/services/flashcards.service';
import { Injectable, Injector } from '@angular/core';
import { noteInstance } from '../../notes/interfaces/noteTemplate';

@Injectable({
    providedIn: 'root'
})
export class NavigatorService {
	pageContent: string = 'Notes';

    constructor(private injector: Injector, private router: Router) { 
		// Runs for every change of the url
		router.events.subscribe((val) => {
			if(val instanceof NavigationEnd){
				// Retrieves the second part of the url (indicates the current location)
				this.pageContent = val.url.split('/')[1]

				// if(this.pageContent == 'Notes'){
				// 	this.injector.get(NotesService).startUp()
				// }
			}
		})
	}

	// Redirects the user to a general url
	moveToUrl(url: string){
		// Refreshes the component by first switching to another one
		this.router.navigate([`/refresh`], { skipLocationChange: true }).then(() => {
			// Redirects the user to the url
			this.router.navigate([url])
		})	
	}

	// Redirects the user to Notes
    moveToNotes(notesId: string){
		this.router.navigate([`/refresh`], { skipLocationChange: true }).then(() => {
			this.router.navigate([`Notes/${notesId}`])
		})
	}
	moveToChildNotes(notesId: string){
		let url = this.router.url

		let splitUrl = url.split('/')
		splitUrl[1] = 'Notes'
		url = splitUrl.join('/')

		this.router.navigate([`/refresh`], { skipLocationChange: true }).then(() => {
			this.router.navigate([`${url}/${notesId}`])
		})
	}

	// Redirects the user to Flashcards
	moveToFlashcards(flashcards: noteInstance[]){
		this.injector.get(FlashcardsService).setFlashcards(flashcards)
		this.injector.get(FlashcardsService).setLastUrl(this.router.url)
		this.router.navigate([`/refresh`], { skipLocationChange: true }).then(() => {
			this.router.navigate(['Flashcards'])
		})
	}

	// Redirects the user to the dashboard
	moveToDashboard(){
		this.router.navigate([`/refresh`], { skipLocationChange: true }).then(() => {
			this.router.navigate(['Dashboard'])
		})	
	}

	// Redirects the user to settings
	moveToSettings(){
		this.router.navigate([`/refresh`], { skipLocationChange: true }).then(() => {
			this.router.navigate(['Settings'])
		})	
	}
}
