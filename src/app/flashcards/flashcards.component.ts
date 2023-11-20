import { Component } from '@angular/core';
import { noteInstance } from '../notes/interfaces/noteTemplate';
import { FlashcardsService } from './services/flashcards.service';

@Component({
    selector: 'app-flashcards',
    templateUrl: './flashcards.component.html',
    styleUrls: ['./flashcards.component.css']
})
export class FlashcardsComponent {
	// Initalises flashcards
	flashcards: noteInstance[]

	// 
	showAnswers: boolean[] = new Array(this.flashcardsService.flashcards.length).fill(false);
	showConfidenceLevel: boolean[] = new Array(this.flashcardsService.flashcards.length).fill(true);
	
	// Determines the current flashcard number
	currentFlashcardIndex: number = 0;

	emptyTitle: noteInstance = {
		type: 'title',
		value: '',
		content: []
	}
    
    constructor(public flashcardsService: FlashcardsService){ }

	ngOnInit(){
		// Sets up key presses to interact with the flashcards
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
		// Moves to the right
		this.currentFlashcardIndex = Math.min(this.flashcardsService.flashcards.length, this.currentFlashcardIndex + 1)
	}
	moveLeft(){
		// Moves to the left
		this.currentFlashcardIndex = Math.max(0, this.currentFlashcardIndex - 1)
	}

    recordConfidenceLevel(confidenceLevel: 0 | 1 | 2 | 3){
        let flashcard = this.flashcardsService.flashcards[this.currentFlashcardIndex]
        
		// Appends the confidence level
		if(flashcard.confidenceLevel != undefined){
            flashcard.confidenceLevel.push(confidenceLevel) 
        }else{
            flashcard.confidenceLevel = [confidenceLevel]
        }
        
		// Sets the date of last review to now
        flashcard.dateOfLastReview = Date.now()

		// Prevents repeated confidence level picks
        this.showConfidenceLevel[this.currentFlashcardIndex] = false
        this.showAnswers[this.currentFlashcardIndex] = true

		// Moves to the next flashcard
        this.currentFlashcardIndex++
    } 
}
