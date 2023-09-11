import { SharingService } from '../../services/sharing.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-sharing',
    templateUrl: './sharing.component.html',
    styleUrls: ['./sharing.component.css']
})
export class SharingComponent {
    sharingOpen: boolean = false;

    owners: string[]
    editors: string[]
    viewers: string[]

    constructor(private sharingService: SharingService) { }

    ngOnInit(){
        this.sharingService.getUsers('owner').then((users: string[]) => {
            this.owners = users
        })
        this.sharingService.getUsers('editors').then((users: string[]) => {
            this.editors = users
        })        
        this.sharingService.getUsers('viewers').then((users: string[]) => {
            this.viewers = users
        })          
    }
}
