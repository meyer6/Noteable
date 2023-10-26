import { NotesService } from '../services/notes.service';
import { Injectable } from '@angular/core';
import { Database, getDatabase, off, onValue, ref, update } from 'firebase/database';

@Injectable({
    providedIn: 'root'
})
export class SharingService {
    // listeners: string[] = []
    //JSON.parse(localStorage.getItem('user')!)?.uid;

    // db: Database = getDatabase()
    // permissionLevel: 'owner' | 'editor' | 'viewer' | 'noAccess' = 'noAccess'

    // checkPermisisonLevel(notesId: string, userId: string){
    //     onValue(ref(this.db, `notes-users/${notesId}/${userId}`), (user) => {
    //         if(user.exists()){
    //             this.permissionLevel = user.val();
    //         }else{
    //             this.permissionLevel = 'noAccess'
    //         }
    //     });
    // }

    // constructor(private notesService: NotesService) { }

	// removeListeners(){
    //     for(let i = 0; i < this.listeners.length; i++){
    //         off(ref(this.db, this.listeners[i]))
    //     }
    // }

	// checkPermissionLevel(){
    //     let uid = JSON.parse(localStorage.getItem('user')!)?.uid;
    //     onValue(ref(this.db, `notes/${this.notesService.notesId}/owner`), (user) => {
    //         if(user.exists() && user.val() == uid){
    //             this.permissionLevel = 'Owner'
    //         }else if(this.permissionLevel == 'Owner'){
    //             this.permissionLevel = 'noAccess'
    //         }
    //     });
    //     onValue(ref(this.db, `notes/${this.notesService.notesId}/editor`), (user) => {
    //         if(user.exists() && user.val().includes(uid)){
    //             this.permissionLevel = 'Editor'
    //         }else if(this.permissionLevel == 'Editor'){
    //             this.permissionLevel = 'noAccess'
    //         }
    //     });
    //     onValue(ref(this.db, `notes/${this.notesService.notesId}/viewer`), (user) => {
    //         if(user.exists() && user.val().includes(uid)){
    //             this.permissionLevel = 'Viewer'
    //         }else if(this.permissionLevel == 'Viewer'){
    //             this.permissionLevel = 'noAccess'
    //         }
    //     });
    //     this.listeners.push(`notes/${this.notesService.notesId}/owner`)
    //     this.listeners.push(`notes/${this.notesService.notesId}/editor`)
    //     this.listeners.push(`notes/${this.notesService.notesId}/viewer`)
    // }

	// addEditor(uid: string){
    //     const updates: {[key: string]: any} = {}
    //     updates[`notes/${this.notesService.notesId}/editors`] = uid
    //     updates[`users/${uid}/notes`] = this.notesService.notesId
    //     update(ref(this.db), updates)
    // }

	// async getUsers(type: 'owner' | 'editors' | 'viewers'){
    //     return new Promise<string[]>((resolve) => {
    //         onValue(ref(this.db, `notes/${this.notesService.notesId}/data/${type}`), (notes) => {
    //             if (notes.exists()) {
    //                 resolve(notes.val()[0].value)
    //             }
    //             resolve([])
    //         }, {
    //             onlyOnce: true
    //         });
    //     })
    // }
    
}
