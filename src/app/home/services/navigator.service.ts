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
		router.events.subscribe((val) => {
			if(val instanceof NavigationEnd){
				this.pageContent = val.url.split('/')[1]

				// if(this.pageContent == 'Notes'){
				// 	this.injector.get(NotesService).startUp()
				// }
			}
		})
		// this.moveToNotes('-NhWhrmRgcVwNO5uq-wm')
	}

	moveToUrl(url: string){
		this.router.navigate([`/refresh`], { skipLocationChange: true }).then(() => {
			this.router.navigate([url])
		})	
	}

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

	moveToFlashcards(flashcards: noteInstance[]){
		this.injector.get(FlashcardsService).setFlashcards(flashcards)
		this.injector.get(FlashcardsService).setLastUrl(this.router.url)
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
