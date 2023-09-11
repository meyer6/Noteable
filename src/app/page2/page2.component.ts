import { dataInstance } from './dataFormat';
import { TaskManager } from './task-manager';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-page2',
    templateUrl: './page2.component.html',
    styleUrls: ['./page2.component.css']
})
export class Page2Component {
    option: string = "Insert";
    pinned: boolean = false;

    optionsOpen: boolean= false;

    insertOptions: Array<Array<any>> = [["Heading 1", "https://www.notion.so/images/blocks/header.57a7576a.png", "subHeading", 1],
        ["Heading 2", "https://www.notion.so/images/blocks/subheader.9aab4769.png", "subHeading", 2],
        ["Heading 3", "https://www.notion.so/images/blocks/subsubheader.d0ed0bb3.png", "subHeading", 3],
        ["Separator", ""],
        ["Text", "https://www.notion.so/images/blocks/text/en-US.png", "text"],
        ["Separator", ""],
        ["Bulleted List", "https://www.notion.so/images/blocks/bulleted-list.0e87e917.png", "bulletPoint"],
        ["Numbered List", "https://www.notion.so/images/blocks/numbered-list.0406affe.png", "numberedPoint"],
        ["To-Do List", "https://www.notion.so/images/blocks/to-do.f8d20542.png", "toDoList", false],
        ["Toggle", "https://www.notion.so/images/blocks/toggle.5e462b2a.png", "toggle"],
        ["Separator", ""],
        ["Divider", "https://www.notion.so/images/blocks/divider.210d0faf.png", "divider"],
        ["Table", "https://www.notion.so/images/blocks/simple-table.e31a23bb.png", "table"]
    ];

    stylingOptions: Array<Array<string>> = [["B", "font-weight: 600;", "bold"], 
        ["i", "font-style: italic", "italic"], 
        ["U", "text-decoration: underline", "underline"], 
        ["S", "text-decoration: line-through", "strikeThrough"]];

    colours: Array<Array<string>> = [["Default", "#37352F", "rgba(0,0,0,0)"],
        ["Grey", "#787774", "#F1F1EF"],
        ["Brown", "#9F6B53", "#F4EEEE"],
        ["Orange", "#D9730D", "#FBECDD"],
        ["Yellow", "#CB912F", "#FBF3DB"],
        ["Green", "#448361", "#EDF3EC"],
        ["Blue", "#337EA9", "#E7F3F8"],
        ["Purple", "#9065B0", "#F6F3F9"],
        ["Pink", "#C14C8A", "#FAF1F5"],
        ["Red", "#D44C47", "#FDEBEC"]
    ];

	constructor(public taskManager: TaskManager, private doms : DomSanitizer){

	}

    safeCss(style: string) {
        return this.doms.bypassSecurityTrustStyle(style);
    }

    min(num1: number, num2: number){
        return Math.min(num1, num2);
    }

    abs(num: number){
        return Math.abs(num);
    }

    insertComponent(i: number){
        let current: Array<dataInstance> = this.taskManager.data;
        let location: Array<number> = this.taskManager.currentFocusedComponent
        if(location[0]==-1){
            location = [this.taskManager.data.length]
        }

        for(let i = 0; i < location.length - 1; i++){
            current = current[location[i]].content;
        }
        current.splice(location[location.length - 1] + 1, 0, {
            "type": this.insertOptions[i][2],
            "value": "<br>",
            "extraData": this.insertOptions[i][3] == undefined ? null : this.insertOptions[i][3],
            "content": []
        });
    }

    changeStyling(type: string, value: string){
        document.execCommand(type, false, value); //////////////////////////////////////////////////////////////////////
            // let preCaretRange = selection.getRangeAt(0);
            // let style = document.createElement('span');
            // style.style.cssText = styling
            // style.appendChild(preCaretRange.extractContents()); 
            // preCaretRange.insertNode(style);
    
        // const selection = window.getSelection();
        // console.log(selection)
        // if (selection != null && selection.anchorNode != null && selection.anchorNode.parentElement != null){
        //     const text = selection.toString();
        //     console.log(text)
        //     const final = `<span style="${styling}">${text}</span>`;
        //     selection.anchorNode.parentElement.innerHTML = selection.anchorNode.parentElement.innerHTML.replace(text, final);
        // }
    }
}
