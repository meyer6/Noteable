import {  Component, ViewChild } from '@angular/core';
import { RecursiveComponent } from './recursive/recursive.component';
import { Functions } from './functions';

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.css'],
})
export class PageComponent {
    data = [   
        {
            "type": "heading",
            "value": "This is the heading",
            "content": null
        },
        {
            "type": "subHeading",
            "value": "This is the subheading",
            "content": 1
        },
        {
            "type": "subHeading",
            "value": "This is the subheading",
            "content": 2
        },
        {
            "type": "subHeading",
            "value": "This is the subheading",
            "content": 3
        },
        {
            "type": "divider",
            "value": "",
            "content": null
        },
        {
            "type": "text",
            "value": "This is the subheading",
            "content": null
        },
        {
            "type": "bulletPoint",
            "value": "This is the bullet point",
            "content": [
                {
                    "type": "bulletPoint",
                    "value": "This is the bullet point1",
                    "content": null
                },
                {
                    "type": "bulletPoint",
                    "value": "This is the bullet point1",
                    "content": null
                }
            ]     
        },
        {
            "type": "bulletPoint",
            "value": "This is the bullet point",
            "content": [
                {
                    "type": "bulletPoint",
                    "value": "This is the bullet point1",
                    "content": null
                },
                {
                    "type": "bulletPoint",
                    "value": "This is the bullet point1",
                    "content": null
                }
            ]     
        }

        // {
        //     "type": "toggle",
        //     "value": "This is the toggle",
        //     "content": [
        //         {
        //             "type": "bulletpoint",
        //             "value": "This is the bullet point",
        //             "content": [
        //                 {
        //                     "type": "toggle",
        //                     "value": "This is the bullet point",
        //                     "content": null
        //                 }
            
        //             ]     
        //         }
        //     ]       
        // }
    ]
    


    // @ViewChild(RecursiveComponent) private recursiveComponent: RecursiveComponent;

    constructor(public taskManager: Functions){

    }


    // mouseLeave(){
    //     this.recursiveComponent.mouseLeave();
    // }







    // beingDragged: boolean = false;
    // mouseCoords: Array<number> = [0, 0, -1];
    // dataLocations: Array<number> = [-1, -1];
    // handleView: number = -1;

    // movies = [
    //     'Episode I - The Phantom Menace',
    //     'Episode II - Attack of the Clones',
    //     'Episode III - Revenge of the Sith',
    //     'Episode IV - A New Hope',
    //     'Episode V - The Empire Strikes Back',
    //     'Episode VI - Return of the Jedi',
    //     'Episode VII - The Force Awakens',
    // ];


    // constructor(){
    //     document.addEventListener("mousemove", (event) => {this.changeMousePosition(event)});
    //     document.addEventListener("mouseup", () => {this.drop()});
    // }

    // viewHandle(event: MouseEvent){
    //     this.handleView = parseInt((<HTMLElement>event.target).id);
    // }

    // unviewHandle(event: MouseEvent){
    //     this.handleView = -1;
    // }
    
    // startDragging(event: MouseEvent){
    //     if(this.beingDragged == false){
    //         this.beingDragged = true;
    //         this.dataLocations[0] = parseInt((<HTMLElement>event.target).id);
    //     }
    // }

    // changeMousePosition(event: MouseEvent){
    //     this.mouseCoords[0] = event.screenX + 20;
    //     this.mouseCoords[1] = event.screenY - 73;
    // }

    // drop(){
    //     if(this.beingDragged){
    //         if (this.dataLocations[1] != -1){
    //             this.movies = this.move(this.movies, this.dataLocations[0], this.dataLocations[1] + 1);
    //         }

    //         this.dataLocations = [-1, -1];
    //         this.beingDragged = false;
    //     }   
    // }

    // mouseEnter(event: MouseEvent){
    //     if((<HTMLElement>event.target).id != ""){
    //         this.dataLocations[1] = parseInt((<HTMLElement>event.target).id);
    //     }
    // }
    
    // mouseLeave(){
    //     this.dataLocations[1] = -1;
    // }

    // move(arr: Array<any>, oldIndex: number, newIndex: number) {
    //     if (newIndex < oldIndex){
    //         arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
    //     }else{
    //         arr.splice(newIndex - 1, 0, arr.splice(oldIndex, 1)[0]);
    //     }
    //     return arr;
    // }
}
