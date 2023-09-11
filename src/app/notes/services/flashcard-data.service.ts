import { Injectable } from '@angular/core';
import { noteInstance } from '../interfaces/noteTemplate';

@Injectable({
    providedIn: 'root'
})
export class FlashcardDataService {

    constructor() { }

	getFinalConfidence(note: noteInstance){
		const confidenceNum = this.getConfidenceLevel(note)
		const timeWeight = this.getTimeWeight(note)
		return confidenceNum + timeWeight
	}

	getConfidenceLevel(note: noteInstance){
        const weights = [0.1, 0.2, 0.7]

		let confidenceNum = 3
		const confidenceLevel = note.confidenceLevel
		if(confidenceLevel != undefined){
			const weightedConfidenceLevel = [3, 3, 3].concat(confidenceLevel).slice(confidenceLevel.length)
			confidenceNum  = 0
			for(let i = 0; i < weightedConfidenceLevel.length; i++){
				confidenceNum += weightedConfidenceLevel[i] * weights[i]
			}
		}
		return confidenceNum
	}

	getTimeWeight(note: noteInstance){
		let timeWeight = 1.22
		if(note.dateOfLastReview != undefined){
			const time = (note.dateOfLastReview - Date.now()) / (1000 * 3600 * 24)
			timeWeight = 1.3 * Math.log(time + 2) - 1.3
		}
		return timeWeight
	}
}
