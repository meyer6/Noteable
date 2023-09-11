import { TaskManager } from '../../task-manager';
import { Component, Input, Output,EventEmitter } from '@angular/core';

@Component({
    selector: 'app-handle2',
    templateUrl: './handle2.component.html',
    styleUrls: ['./handle2.component.css']
})
export class Handle2Component {
	@Input() taskManager: TaskManager;
	@Input() currentLocation: Array<number>;

    handleView: boolean = false;

    startDraggingCoords: Array<number> = [-1, -1]; 
    scroll: ReturnType<typeof setInterval> | null = null;

    startDragging(event: MouseEvent){
        this.startDraggingCoords = [event.pageX, event.pageY]

        let handleFunction = (event: MouseEvent) => {
            if ((Math.abs(this.startDraggingCoords[0] - event.pageX) > 10 || Math.abs(this.startDraggingCoords[1] - event.pageY) > 10)){
                this.taskManager.dataLocations[0] = this.currentLocation
                this.taskManager.beingDragged = true;
            }

            if(this.taskManager.beingDragged){
                if (event.screenY < window.outerHeight * 0.25  && this.scroll == null){
                    this.scroll = setInterval(this.scrollPage, 8, -8, this.taskManager.mouseCoords)
                }else if (event.screenY > window.outerHeight * 0.87 && this.scroll == null){
                    this.scroll = setInterval(this.scrollPage, 8, 8, this.taskManager.mouseCoords)
                }
            }     
    
            if (this.scroll != null && (event.screenY <= window.outerHeight * 0.87 && event.screenY >= window.outerHeight * 0.25)){
                clearInterval(this.scroll)
                this.scroll = null
            }
        }
        document.addEventListener("mousemove", handleFunction)
        document.addEventListener("mouseup", () => {
            if(this.taskManager.beingDragged == false){
                this.taskManager.selectedComponent = this.currentLocation
            }else{
                this.taskManager.beingDragged = false
                if (this.taskManager.dataLocations[1].length != 0){
                    this.taskManager.move(1, this.taskManager.dataLocations[0], this.taskManager.dataLocations[1])
                }
            }

            if (this.scroll != null && (event.screenY <= window.outerHeight * 0.87 && event.screenY >= window.outerHeight * 0.25)){
                clearInterval(this.scroll)
                this.scroll = null
            }            
            document.removeEventListener("mousemove", handleFunction)
        }, {once : true})
    }

    scrollPage(offset: number, mouseCoords: Array<number>){
        window.scrollBy({"top": offset})
        if(mouseCoords[1] > 80){
            mouseCoords[1] += offset
        }
    }
}
