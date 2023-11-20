import { noteInstance } from 'src/app/notes/interfaces/noteTemplate';
import { NavigatorService } from './../../services/navigator.service';
import { Component } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { UserDetails } from 'src/app/account/interfaces/userInterfaces';
import { auth } from 'src/environments/environment';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
    myNotes: noteInstance[] = [];
	sharedNotes: noteInstance[] = []

    userInfo: UserDetails;

    // Determines if the toggles for my and shared notes are open or not
    open1: boolean = true;
	open2: boolean = true;

    width: number = 230;
    dragging: boolean = false;

    constructor(private navigatorService: NavigatorService, private dashboardService: DashboardService){}

    ngOnInit(){
		this.dashboardService.getPages(this.myNotes, this.sharedNotes)
        this.getUserInfo()
    }

    redirectToSettings(){
        this.navigatorService.moveToSettings()
    }
    redirectToDashboard(){
        this.navigatorService.moveToDashboard()
    }

    resize(){
        // Starts dragging
        this.dragging = true
        
        // Sets the width to the mouse's x position
        const moveFunction =  (event: MouseEvent) => {
            this.width = event.clientX
        } 
        document.addEventListener('mousemove', moveFunction)

        document.addEventListener('mouseup', () => {
            // Stops dragging
            this.dragging = false
            document.removeEventListener('mousemove', moveFunction)
        }, {once: true})   
    }

    getUserInfo(){
        // Retrieves the user information
        this.userInfo = JSON.parse(localStorage.getItem('user')!)
    }
}
