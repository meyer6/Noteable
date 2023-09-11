import { Component } from '@angular/core';
import { noteInstance } from '../notes/interfaces/noteTemplate';
import { FlashcardsService } from './services/flashcards.service';

@Component({
    selector: 'app-flashcards',
    templateUrl: './flashcards.component.html',
    styleUrls: ['./flashcards.component.css']
})
export class FlashcardsComponent {
	flashcards: noteInstance[]

	showAnswers: boolean[] = new Array(this.flashcardsService.flashcards.length).fill(false);
	showConfidenceLevel: boolean[] = new Array(this.flashcardsService.flashcards.length).fill(true);
	currentFlashcardIndex: number = 0;

	emptyTitle: noteInstance = {
		type: 'title',
		value: '',
		content: []
	}
    
    constructor(public flashcardsService: FlashcardsService){ }

	ngOnInit(){
		document.addEventListener('keyup', (event: KeyboardEvent) => {
			if(event.key == 'ArrowRight'){
				this.moveRight()
			}else if(event.key == 'ArrowLeft'){
				this.moveLeft()
			}else if(event.code == 'Space' || event.key == 'ArrowDown' || event.key == 'ArrowUp'){
				this.showAnswers[this.currentFlashcardIndex] = !this.showAnswers[this.currentFlashcardIndex]
			}
		})		
	}

	moveRight(){
		this.currentFlashcardIndex = Math.min(this.flashcardsService.flashcards.length, this.currentFlashcardIndex + 1)
	}
	moveLeft(){
		this.currentFlashcardIndex = Math.max(0, this.currentFlashcardIndex - 1)
	}

    recordConfidenceLevel(confidenceLevel: 0 | 1 | 2 | 3){
        let flashcard = this.flashcardsService.flashcards[this.currentFlashcardIndex]
        if(flashcard.confidenceLevel != undefined){
            flashcard.confidenceLevel.push(confidenceLevel) 
        }else{
            flashcard.confidenceLevel = [confidenceLevel]
        }
        
        flashcard.dateOfLastReview = Date.now()

        this.showConfidenceLevel[this.currentFlashcardIndex] = false
        this.showAnswers[this.currentFlashcardIndex] = true
        this.currentFlashcardIndex++
    } 
}
