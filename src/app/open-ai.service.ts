import { Injectable } from '@angular/core';
import { OpenAI } from 'openai';

@Injectable({
    providedIn: 'root'
})
export class OpenAiService {
    constructor() { }

    readonly openai = new OpenAI({
        apiKey: '__________________', 
        dangerouslyAllowBrowser: true
    });  

    async getAiRepsonse(prompt: string) {
        // console.log("DONE")
        // const stream = await this.openai.chat.completions.create({
        //     model: "gpt-3.5-turbo",
        //     messages: [{"role": "user", "content": prompt}],
        //     // stream: true,
        // });
        // console.log("SSSS")
        // for await (const part of stream) {
        //     console.log(part.choices[0].delta);
        // }
	}
}
