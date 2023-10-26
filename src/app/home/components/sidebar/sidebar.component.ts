import { noteInstance } from 'src/app/notes/interfaces/noteTemplate';
import { NavigatorService } from './../../services/navigator.service';
import { Component } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { UserDetails } from 'src/app/account/interfaces/userInterfaces';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
    myNotes: noteInstance[] = [];
	sharedNotes: noteInstance[] = []

    userInfo: UserDetails;

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

    getUserInfo(){
        this.userInfo = JSON.parse(localStorage.getItem('user')!)
    }
}
