import { Injectable } from '@angular/core';
import { Database, getDatabase, onValue, ref } from 'firebase/database';
import { noteInstance } from 'src/app/notes/interfaces/noteTemplate';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    db: Database = getDatabase()

    constructor() { }

	getPageSnapshot(userId: string){
        return new Promise<{[key: string]: string}>((resolve) => {
            onValue(ref(this.db, `users-notes/${userId}`), (notes) => {
                resolve(notes.val())
            }, {onlyOnce: true});
        })
	}

    getNoteSnapshot(noteId: string){
        return new Promise<noteInstance[]>((resolve) => {
            onValue(ref(this.db, `notes/${noteId}`), (notes) => {
                resolve(notes.val())
            }, {onlyOnce: true});
        })
    }

    getPages(myNotes: noteInstance[], sharedNotes: noteInstance[]){
		const userId = JSON.parse(localStorage.getItem('user')!)?.uid
		this.getPageSnapshot(userId).then((pages: {[key: string]: string}) => {
			Object.keys(pages).forEach((pageKey: string) => {

				const page = {
					type: 'page',
					value: pageKey,
					content: this.getPageContent(pageKey)
				}

				if(pages[pageKey] == 'Owner'){
					myNotes.push(page)
				}else{
					sharedNotes.push(page)
				}
			})
		})
    }

    getPageContent(pageKey: string){
		let content: noteInstance[] = []
		this.getNoteSnapshot(pageKey).then((notes: noteInstance[]) => {
			for(let note of notes){
				if(note.type == 'page'){
					content.push({
						type: 'page',
						value: note.value,
						content: this.getPageContent(note.value)
					})
				}
			}
		})
		return content
	}
}
