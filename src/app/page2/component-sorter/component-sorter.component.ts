import { TaskManager } from './../task-manager';
import { Component, Input, Pipe } from '@angular/core';
import { dataInstance } from '../dataFormat';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-component-sorter',
    templateUrl: './component-sorter.component.html',
    styleUrls: ['./component-sorter.component.css']
})
export class ComponentSorterComponent {
	@Input() dataInstance: dataInstance;
	@Input() taskManager: TaskManager;
    @Input() currentLocation: Array<number>;

    pastLocation: Array<number> = []
    index: number | string = 1;
    level: number = 1;

    textComponent: dataInstance = {"type": "text", "value": "", "extraData": null, "content": []};
    open: boolean = false;

    focused: null  | FocusEvent= null
    
    resizeImage: Array<number> = [-1, -1]

    ngDoCheck(){
        if((this.dataInstance.type=="numberedPoint" || this.dataInstance.type=="bulletPoint" ) && 
            this.currentLocation.toString() != this.pastLocation.toString()){
            this.level = this.getLevel()
            this.index = this.getIndexOfNumberedList()
            if(this.dataInstance.type=="numberedPoint" && this.level % 2 == 0){
                this.index = this.convertIndexToString(this.index)
            }
            this.pastLocation = this.currentLocation
        }
        if(this.taskManager.currentKeyPress != null && this.taskManager.currentFocusedComponent.toString() == this.currentLocation.toString()){
            if(this.dataInstance.type != "toggle" && this.dataInstance.type != "heading"){
                this.keyPress(this.taskManager.currentKeyPress)
            }else if(this.dataInstance.type != "heading"){
                this.toggleKeyPress(this.taskManager.currentKeyPress)
            }
            this.taskManager.currentKeyPress = null
        }
        if(this.focused != null  && this.taskManager.currentFocusedComponent.toString() != this.currentLocation.toString()){
            let element = this.getData()
            if(element != null){           
                this.dataInstance.value = element.innerHTML 
                this.focused = null
            }
        }
    }

    getData(){
        if(this.focused != null){
            let element = (<HTMLElement>this.focused.target)
            while(element.id != "parent" && element.parentElement != null){
                element = element.parentElement
            }
            return element
        }
        return this.focused
    }

    getContentAtLocation(location: Array<number>){
        let current: Array<dataInstance> = this.taskManager.data;
        for(let i = 0; i < location.length - 1; i++){
            current = current[location[i]].content;
        }
        return current;
    }

    updateContentAtLocation(location: Array<number>, value: string){
        let current = this.getContentAtLocation(location);
        current[location[location.length - 1]].value = value;
    }

    addContentAtLocation(location: Array<number>, addedContent: dataInstance){
        let current = this.getContentAtLocation(location);
        current.splice(location[location.length - 1] + 1, 0, addedContent);
    }

    removeContentAtLocation(location: Array<number>){
        let current = this.getContentAtLocation(location);
        current.splice(location[location.length - 1], 1);
    }

    removeComponent(){
        for (let i=this.dataInstance.content.length-1; i>-1; i--){
            this.addContentAtLocation(this.currentLocation, this.dataInstance.content[i]);
        }
        this.removeContentAtLocation(this.currentLocation);
    }

    
    focus(event: FocusEvent){
        this.focused = event
        this.taskManager.currentFocusedComponent = this.currentLocation
    }

    paste(event: ClipboardEvent){
        event.preventDefault();

        const selection = window.getSelection();
        if(event.clipboardData != null && selection != null){
            if(event.clipboardData.files[0] != undefined && event.clipboardData.files[0].type.includes("image")){
                let html = event.clipboardData.getData('text/html')

                let index1 = html.indexOf('src=\"') + 5
                let index2 = html.slice(index1, html.length).indexOf('\"')
                let link = html.slice(index1, index2 + index1)

                let current = this.getContentAtLocation(this.currentLocation)
                console.log(html, event.clipboardData, "W")
                current.splice(this.currentLocation[this.currentLocation.length - 1] + 1, 0, {
                    "type": "image",
                    "value": link,
                    "extraData": 400,
                    "content": []
                });
                console.log(event.clipboardData.files[0])
            }else{
                let preCaretRange = selection.getRangeAt(0);
                let text = document.createElement('span');
                console.log(event.clipboardData.getData('text/html'))
                text.innerHTML = event.clipboardData.getData('text/html'); 
                preCaretRange.insertNode(text);
            }
        }
  
            // const text = event.clipboardData.getData('text/plain')
            // let selection = document.getSelection() 
            // if(selection != null){
            //     let range = selection.getRangeAt(0);
            //     let style = document.createElement('span');
            //     style.style.cssText = "color: blue"
            //     style.appendChild(preCaretRange.extractContents()); 
            //     preCaretRange.insertNode(style);

            //     range.deleteContents();

                // const textNode = document.createTextNode(text);
                // range.insertNode(textNode);
                // range.selectNodeContents(textNode);
                // range.collapse(false);
                // console.log(range)

                // let selection2 = window.getSelection();
                // if(selection2 != null){     

                //     console.log(selection2)
                //     selection2.removeAllRanges();
                //     selection2.addRange(range);
                // }
            // }
        // }

        // event.preventDefault();
        // if(event.clipboardData != null){
        //     (<HTMLElement>event.target).innerText += event.clipboardData.getData('text/plain');

        // }
    }

    keyPress(event: KeyboardEvent){
        let element = this.getData()
        if (event.key === "Enter"){
            this.addContentAtLocation(this.currentLocation, {"type": this.dataInstance.type, "value": "<br>", "extraData": this.dataInstance.extraData, "content": []});
            event.preventDefault();
        }else if (event.key === "Backspace" && element != null && element.innerHTML=="<br>"){
            // element.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Left'}));
            this.removeComponent();
        }else if (this.taskManager.shiftPressed && event.key === "Tab" && this.currentLocation.length > 1){
            this.shiftTabPress(event)
        }else if (!this.taskManager.shiftPressed && event.key === "Tab" && this.currentLocation[this.currentLocation.length - 1] >= 1){
            this.tabPress(event)
        }
    }

    tabPress(event: KeyboardEvent){
        let length = this.currentLocation.length
        let parent = this.getContentAtLocation(this.currentLocation)
        let current = parent[this.currentLocation[length - 1]]
        
        if(parent[this.currentLocation[length - 1] - 1].type != "divider" && parent[this.currentLocation[length - 1] - 1].type != "heading"){
            parent[this.currentLocation[length - 1] - 1].content.push(current)
            this.removeContentAtLocation(this.currentLocation);
        }
        event.preventDefault();
    }

    shiftTabPress(event: KeyboardEvent){
        let length: number = this.currentLocation.length
        let parent = this.getContentAtLocation(this.currentLocation)
        let current = parent[this.currentLocation[length - 1]]

        let restOfContent = parent.splice(this.currentLocation[length - 1] + 1, parent.length - 1)

        this.removeContentAtLocation(this.currentLocation)
        this.addContentAtLocation(this.currentLocation.slice(0, length - 1), current)

        current.content = current.content.concat(restOfContent)

        event.preventDefault();
    }

    toggleKeyPress(event: KeyboardEvent){
        let element = this.getData()
        if (event.key == "Enter"){
            if (!this.open){
                this.addContentAtLocation(this.currentLocation, {"type": "toggle", "value": "<br>", "extraData": null, "content": [
                    {"type": "text", "value": "", "extraData": null, "content": []}
                ]});
            }else{
                this.addContentAtLocation(this.currentLocation.concat([-1]), {"type": "text", "value": "", "extraData": null, "content": []});
            }
            event.preventDefault();
        }else if (event.key === "Backspace" && element != null && element.innerHTML=="<br>"){
            this.removeComponent();
        }else if (this.taskManager.shiftPressed && event.key === "Tab" && this.currentLocation.length > 1){
            this.shiftTabPress(event)
        }else if (!this.taskManager.shiftPressed && event.key === "Tab" && this.currentLocation[this.currentLocation.length - 1] >= 1){
            this.tabPress(event)
        }
    }

    toDoListChange(){
        this.dataInstance.extraData = !this.dataInstance.extraData;
    }

    image(event: MouseEvent){
        this.resizeImage = [this.dataInstance.extraData, event.screenX];
        let changeWidth = (event: MouseEvent) => {
            this.dataInstance.extraData = Math.max(75, (Math.min(650, this.resizeImage[0] - this.resizeImage[1] + event.screenX)))
        }
        document.addEventListener("mousemove", changeWidth)
        document.addEventListener("mouseup", (event: MouseEvent) => {
            document.removeEventListener("mousemove", changeWidth)
        }, {once : true})
    }

    getLevel(){
        let start = this.currentLocation.length - 1
        let type = this.getContentAtLocation(this.currentLocation.slice(0, start + 1))[this.currentLocation[start]].type
        let level = 0
        while (start > 0 && type == this.dataInstance.type){
            level ++
            start--
            type = this.getContentAtLocation(this.currentLocation.slice(0, start + 1))[this.currentLocation[start]].type
        }
        if(start == 0 && this.taskManager.data[this.currentLocation[0]].type == this.dataInstance.type){
            return level + 1
        }
        return level
    }
    getIndexOfNumberedList(){
        const parent = this.getContentAtLocation(this.currentLocation);
        let start = this.currentLocation[this.currentLocation.length - 1]
        let index = 0
        while (start >= 0 && parent[start].type == "numberedPoint"){
            index ++
            start--
        }
        return index
    }
    convertIndexToString(index: number){
        return String.fromCharCode(96 + index);
    }
}