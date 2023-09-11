import { FlashcardDataService } from './../../services/flashcard-data.service';
import { Component } from '@angular/core';
import { NavigatorService } from 'src/app/home/services/navigator.service';
import { NotesService } from '../../services/notes.service';
import { noteInstance } from '../../interfaces/noteTemplate';

@Component({
    selector: 'app-flashcards-options',
    templateUrl: './flashcards-options.component.html',
    styleUrls: ['./flashcards-options.component.css']
})
export class FlashcardsOptionsComponent {
    flashcardsOptionOpen: boolean = false
    
    constructor(
        public navigatorService: NavigatorService, 
        public notesService: NotesService,
        private flashcardDataService: FlashcardDataService,
    ){}

	openFlashcardOptions(){
        if(!this.flashcardsOptionOpen){
            let done = false
            const changeOptionState = () => {
                this.flashcardsOptionOpen = !this.flashcardsOptionOpen;
                if(done) document.removeEventListener('click', changeOptionState)
                done = true
            }
            document.addEventListener('click', changeOptionState)
        }
    }

    flashcardFullReview(){
        const flashcards = this.notesService.notes.filter((note: noteInstance) => {
            return note.type == 'toggle' || note.value.includes('cloze')
        })
        this.navigatorService.moveToFlashcards(flashcards)
    }

    flashcardmartReview(threshold: number){
        let flashcards = this.notesService.notes.filter((note: noteInstance) => {
            if(note.type != 'toggle' && !note.value.includes('cloze')){
                return false
            }

            return this.flashcardDataService.getFinalConfidence(note) > threshold
        })

        this.navigatorService.moveToFlashcards(flashcards)
    }
}
