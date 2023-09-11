import { Injectable } from "@angular/core"
import { dataInstance } from "./dataFormat";
import { ConstantPool } from "@angular/compiler";

@Injectable({
    providedIn: 'root',
})
export class TaskManager{
    // when dragging from handle stores original and later component coords
    dataLocations: Array<Array<number>> = [[], []];
    beingDragged: boolean = false;

    selectedComponent: Array<number> = [-1];
    selectingWindow: Array<number> = [-1, -1];

    currentFocusedComponent: Array<number> = [-1]

    currentKeyPress: KeyboardEvent | null = null;

    mouseCoords: Array<number> = [-1, -1];

    shiftPressed: boolean = false;
    data: Array<dataInstance> = [   
        {
            "type": "heading",
            "value": "This is the heading",
            "extraData": null,
            "content": []
        },
        {
            "type": "subHeading",
            "value": "This is the subheading",
            "extraData": 1,
            "content": []
        },
        {
            "type": "subHeading",
            "value": "This is the subheading",
            "extraData": 2,
            "content": []
        },
        {
            "type": "subHeading",
            "value": "This is the subheading",
            "extraData": 3,
            "content": []
        },
        {
            "type": "divider",
            "value": "",
            "extraData": null,
            "content": []
        },
        {
            "type": "text",
            "value": "This is the subheading",
            "extraData": null,
            "content": []
        },        
        {
            "type": "numberedPoint",
            "value": "This is the bullet point",
            "extraData": null,
            "content": [
                {
                    "type": "numberedPoint",
                    "value": "This is the bullet point1",
                    "extraData": null,
                    "content": []
                }
            ]
        },
        {
            "type": "numberedPoint",
            "value": "This is the bullet point",
            "extraData": null,
            "content": []
        },
        {
            "type": "toDoList",
            "value": "This is the subheading",
            "extraData": false,
            "content": []
        },
        {
            "type": "toggle",
            "value": "This is the toggle",
            "extraData": null,
            "content": [        
                {
                    "type": "toggle",
                    "value": "This is the toggle",
                    "extraData": null,
                    "content": [
                        {
                            "type": "text",
                            "value": "This is the subheading",
                            "extraData": null,
                            "content": []
                        },
                    ]
                }
            ]
        },
        {
            "type": "bulletPoint",
            "value": "This is the bullet point",
            "extraData": null,
            "content": [
                {
                    "type": "bulletPoint",
                    "value": "This is the bullet point1",
                    "extraData": null,
                    "content": [
                        {
                            "type": "bulletPoint",
                            "value": "This is the bullet point1",
                            "extraData": null,
                            "content": []
                        },
                    ]
                },
                {
                    "type": "bulletPoint",
                    "value": "This is the bullet point2",
                    "extraData": null,
                    "content": []
                }
            ]     
        },
        {
            "type": "bulletPoint",
            "value": "This is the bullet point",
            "extraData": null,
            "content": [
                {
                    "type": "bulletPoint",
                    "value": "This is the bullet point3",
                    "extraData": null,
                    "content": []
                },
                {
                    "type": "bulletPoint",
                    "value": "This is the bullet point4",
                    "extraData": null,
                    "content": []
                }
            ]     
        }
    ]

    constructor(){
        document.addEventListener("mousemove", (event) => {this.changeMousePosition(event)});
        document.addEventListener("mousedown", (event) => {this.selectedComponent = [-1]});
        document.addEventListener("keyup", (event) => {this.keyboardUpUpdate(event)});
        document.addEventListener("keydown", (event) => {this.keyboardDownUpdate(event)});
    }

    keyboardDownUpdate(event: KeyboardEvent){
        if (event.key === "Shift"){
            this.shiftPressed = true
        }
    }

    keyboardUpUpdate(event: KeyboardEvent){
        if (event.key === "Shift"){
            this.shiftPressed = false
        }
    }

    startHighlightDrag(event: MouseEvent){
        if((<HTMLElement>event.target).className != "handle-png"){
            event.preventDefault()
            this.selectingWindow[0] = this.mouseCoords[0]
            this.selectingWindow[1] = this.mouseCoords[1]

            let selectingWindowFunction = (event: MouseEvent) => {
            }
            document.addEventListener("mousemove", selectingWindowFunction)
            document.addEventListener("mouseup", () => {
                this.selectingWindow[0] = -1
                document.removeEventListener("mousemove", selectingWindowFunction)
            }, {once : true})
        }
    }

    changeMousePosition(event: MouseEvent){
        this.mouseCoords[0] = event.pageX + 20;
        this.mouseCoords[1] = event.pageY;
    }

    move(numOfItems: number, oldIndex: Array<number>, newIndex: Array<number>) {
        if(newIndex.slice(0, oldIndex.length).toString() != oldIndex.toString()){
            let current: Array<dataInstance> = this.data;
            for(let i = 0; i < oldIndex.length - 1; i++){
                current = current[oldIndex[i]].content;
            }
            let item: any = current[oldIndex[oldIndex.length - 1]]
            current.splice(oldIndex[oldIndex.length - 1], numOfItems);

            current = this.data;
            let same: boolean = true;
            for(let i = 0; i < newIndex.length - 1; i++){
                if(newIndex[i] != oldIndex[i] && i == oldIndex.length - 1 && same){
                    same = false;
                    if(newIndex[i] < oldIndex[i]){
                        current = current[newIndex[i]].content;
                    }else{
                        current = current[newIndex[i] - numOfItems].content;
                    }
                }else{
                    current = current[newIndex[i]].content;
                }
                if(i == oldIndex.length - 1){
                    same = false;
                }
            }  

            if(newIndex[newIndex.length - 1] != oldIndex[newIndex.length - 1] && same){
                if(newIndex[newIndex.length - 1] < oldIndex[newIndex.length - 1]){
                    current.splice(newIndex[newIndex.length - 1] + numOfItems, 0, item);
                }else{
                    current.splice(newIndex[newIndex.length - 1], 0, item);
                }
            }else{
                current.splice(newIndex[newIndex.length - 1] + numOfItems, 0, item);
            }        
        }
        return this.data;
    }
}

// drag to highlight

// ctrl c & v
// ctrl z & y


// table
// equations
// columns?

// Add page icon
