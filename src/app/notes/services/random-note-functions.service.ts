import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RandomNoteFunctionsService {

    constructor() { }

	addMathsEquations(){
		// Retrieves the element with the classname mathquill
		const mathsEquations = document.getElementsByClassName("mathquill")

		// Loops through them
		for(let i = 0; i < mathsEquations.length; i++){

			// Converts them into mathquill maths equations
			const MQ = (window as any).MathQuill.getInterface(2);
			MQ.MathField(mathsEquations[i],{
				spaceBehavesLikeTab: true,
				handlers: {
					// moveOutOf: (dir: any) => { 
					// 	let currentElement = document.activeElement
					// 	while(currentElement != null && currentElement.parentElement != null && !currentElement.parentElement?.className.includes('universal')){
					// 		currentElement = currentElement.parentElement
					// 	}	
					// 	if (dir === MQ.L){
					// 		this.moveCaret(currentElement?.parentElement, this.getCaretPosition(currentElement?.parentElement as any) - 1)
					// 	}else{
					// 		this.moveCaret(currentElement?.parentElement, this.getCaretPosition(currentElement?.parentElement as any) + 4)
					// 	}
					// },
					// deleteOutOf: () => { 
					// 	// this.moveCaret(-1)
					// }
				}
			});
		}	
	}

	// https://stackoverflow.com/questions/3145030/convert-integer-into-its-character-equivalent-where-0-a-1-b-etc
	convertNumToChar(i: number): string {
		return (
			(i >= 26 ? this.convertNumToChar(((i / 26) >> 0) - 1) : "") +
			"abcdefghijklmnopqrstuvwxyz"[i % 26 >> 0]
		);
	}

	// https://stackoverflow.com/questions/9083037/convert-a-number-into-a-roman-numeral-in-javascript
	convertNumToRoman(index: number) {
		let roman = {'M': 1000, 'CM': 900, 'D': 500, 'CD': 400, 'C': 100, 'XC': 90, 'L': 50, 'XL': 40, 'X': 10, 'IX': 9, 'V': 5, 'IV': 4, 'I': 1};
		let str = '';
	  
		for (let i of Object.keys(roman)) {
		  let q = Math.floor(index / (roman as any)[i]);
		  index -= q * (roman as any)[i];
		  str += i.repeat(q);
		}
		return str;
	}
}
