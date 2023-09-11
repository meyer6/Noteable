import {  Component, Input } from '@angular/core';
import { dataInstance } from '../../page2/dataFormat';
import { Functions } from '../functions';
@Component({
    selector: 'app-recursive',
    templateUrl: './recursive.component.html',
    styleUrls: ['./recursive.component.css']
})
export class RecursiveComponent {
    @Input() taskManager: Functions;
    @Input() data: Array<dataInstance>;

    // beingDragged: boolean = false;
    // mouseCoords: Array<number> = [0, 0, -1];
    // dataLocations: Array<number> = [-1, -1];
    // handleView: number = -1;


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
    //             this.data = this.move(this.data, this.dataLocations[0], this.dataLocations[1] + 1);
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
    //     }else if (newIndex > oldIndex){
    //         arr.splice(newIndex - 1, 0, arr.splice(oldIndex, 1)[0]);
    //     }
    //     return arr;
    // }
}

