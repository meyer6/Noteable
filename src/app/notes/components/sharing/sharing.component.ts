import { Component } from '@angular/core';
import { NotesService } from '../../services/notes.service';

@Component({
    selector: 'app-sharing',
    templateUrl: './sharing.component.html',
    styleUrls: ['./sharing.component.css']
})
export class SharingComponent {
    sharingOpen: boolean = false;

    permissions: string[] = ['Viewer', 'Editor', 'Owner']

    usersData: any[];

    constructor(public notesService: NotesService) { }

    ngOnInit(){
        this.getUsers()
    }

    getUsers(){
        this.notesService.sharing.getSharedPeople(this.notesService.notesId, (usersData: any) => {
            this.usersData = usersData
        })
    }

    checkValidity(oldIndex: number, newIndex: number){
        const myIndex = this.permissions.indexOf(this.notesService.sharing.permissionLevel)

        console.log(myIndex, oldIndex, newIndex)
        if(myIndex > oldIndex && myIndex >= newIndex && oldIndex != 2 && newIndex != 2){ 
            return true
        }
        return false
    }

    changePermissionLevel(userId: string, newPermissionLevel: string){
        this.notesService.sharing.changePermissionLevel(this.notesService.notesId, userId, newPermissionLevel)
        this.getUsers()
    }

    editUserRight(userIndex: number){
        const newIndex = (this.permissions.indexOf(this.usersData[userIndex].permission) + 1) % 3
        
        if(this.checkValidity(this.permissions.indexOf(this.usersData[userIndex].permission), newIndex)){
            this.changePermissionLevel(this.usersData[userIndex].userId, this.permissions[newIndex])
        }
    }
    editUserLeft(userIndex: number){
        const newIndex = (this.permissions.indexOf(this.usersData[userIndex].permission) + 2) % 3
        
        if(this.checkValidity(this.permissions.indexOf(this.usersData[userIndex].permission), newIndex)){
            this.changePermissionLevel(this.usersData[userIndex].userId, this.permissions[newIndex])
        }    
    }

    removeUser(userIndex: number){        
        if(this.checkValidity(this.permissions.indexOf(this.usersData[userIndex].permission), -1)){
            this.changePermissionLevel(this.usersData[userIndex].userId, 'noAccess')
        }
    }
    
    addUser(email: string){
        this.notesService.sharing.getUserIdFromEmail(email).then((userId) => {
            if(typeof userId === 'string'){
                this.changePermissionLevel(userId, 'Viewer')
            }
        })
    }


    // ngOnInit(){
    //     this.sharingService.getUsers('owner').then((users: string[]) => {
    //         this.owners = users
    //     })
    //     this.sharingService.getUsers('editors').then((users: string[]) => {
    //         this.editors = users
    //     })        
    //     this.sharingService.getUsers('viewers').then((users: string[]) => {
    //         this.viewers = users
    //     })          
    // }
}
