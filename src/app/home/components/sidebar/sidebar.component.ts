import { NavigatorService } from './../../services/navigator.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
	open1: boolean = true;
	open2: boolean = true;

    width: number = 230;
    dragging: boolean = false;

    constructor(private navigatorService: NavigatorService){}

    redirectToSettings(){
        this.navigatorService.moveToSettings()
    }
    redirectToDashboard(){
        this.navigatorService.moveToDashboard()
    }

    resize(){
        this.dragging = true
        
        const moveFunction =  (event: MouseEvent) => {
            this.width = event.clientX
        } 
        document.addEventListener('mousemove', moveFunction)

        document.addEventListener('mouseup', () => {
            this.dragging = false
            document.removeEventListener('mousemove', moveFunction)
        }, {once: true})   
    }
}
