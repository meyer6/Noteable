import { Component } from '@angular/core';
import { NotesService } from '../../services/notes.service';

@Component({
    selector: 'app-sharing',
    templateUrl: './sharing.component.html',
    styleUrls: ['./sharing.component.css']
})
export class SharingComponent {
    // Determines whether the sharing tab is open or not
    sharingOpen: boolean = false;

    // Stores the different permission levels
    permissions: string[] = ['Viewer', 'Editor', 'Owner']

    usersData: any[];

    constructor(public notesService: NotesService) { }

    ngOnInit(){
        this.getUsers()
    }

    getUsers(){
        // Retrieves the user's data
        this.notesService.sharing.getSharedPeople(this.notesService.notesId, (usersData: any) => {
            this.usersData = usersData
        })
    }

    checkValidity(oldIndex: number, newIndex: number){
        const myIndex = this.permissions.indexOf(this.notesService.sharing.permissionLevel)

        // Determines whether the change in permission level is allowed 
        // based on the permission levels of the respective users
        if(myIndex > oldIndex && myIndex >= newIndex && oldIndex != 2 && newIndex != 2){ 
            return true
        }
        return false
    }

    // Changes the permission level
    changePermissionLevel(userId: string, newPermissionLevel: string){
        this.notesService.sharing.changePermissionLevel(this.notesService.notesId, userId, newPermissionLevel)
        this.getUsers()
    }

    // Increases a users access level
    editUserRight(userIndex: number){
        const newIndex = (this.permissions.indexOf(this.usersData[userIndex].permission) + 1) % 3
        
        if(this.checkValidity(this.permissions.indexOf(this.usersData[userIndex].permission), newIndex)){
            this.changePermissionLevel(this.usersData[userIndex].userId, this.permissions[newIndex])
        }
    }
    // Decreases a users access level
    editUserLeft(userIndex: number){
        const newIndex = (this.permissions.indexOf(this.usersData[userIndex].permission) + 2) % 3
        
        if(this.checkValidity(this.permissions.indexOf(this.usersData[userIndex].permission), newIndex)){
            this.changePermissionLevel(this.usersData[userIndex].userId, this.permissions[newIndex])
        }    
    }

    // Removes a user from the notes
    removeUser(userIndex: number){        
        if(this.checkValidity(this.permissions.indexOf(this.usersData[userIndex].permission), -1)){
            this.changePermissionLevel(this.usersData[userIndex].userId, 'noAccess')
        }
    }
    
    // Adds a user on the notes
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
