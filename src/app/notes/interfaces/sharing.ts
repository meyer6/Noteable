import { child } from 'firebase/database';
import { Database, equalTo, get, getDatabase, off, onValue, orderByChild, query, ref, update } from 'firebase/database';

export class Sharing {
    db: Database = getDatabase()

    permissionLevel: string = 'noAccess';

    getPermissionLevelSnapshot(notesId: string, userId: string){
        return new Promise((resolve) => {
            onValue(ref(this.db, `users-notes/${userId}/${notesId}`), (permissionLevel) => {
                if(permissionLevel.exists()){
                    resolve(permissionLevel.val());
                }
                resolve('noAccess')
            }, {onlyOnce: true});
        })
    }

    getPermissionLevel(notesId: string, userId: string, callback: any){
        onValue(ref(this.db, `users-notes/${userId}/${notesId}`), (permissionLevel) => {
            if(permissionLevel.exists()){
                this.permissionLevel = permissionLevel.val()
                callback(permissionLevel.val());
            }else{
                this.permissionLevel = 'noAccess'
                callback('noAccess');
            }
        });


        // return new Promise((resolve) => {
        //     onValue(ref(this.db, `users-notes/${userId}/${notesId}`), (permissionLevel) => {
        //         if(permissionLevel.exists()){
        //             resolve(permissionLevel.val());
        //         }
        //         resolve('noAccess')
        //     }, {onlyOnce: true});
        // })
    }

    getSharedPeople(notesId: string, callback: any){
        onValue(ref(this.db, `notes-users/${notesId}`), (peopleIds) => {
            if(peopleIds.exists()){


                let usersData: any = []
                for(let userId of Object.keys(peopleIds.val())){
                    onValue(ref(this.db, `users/${userId}`), (userData) =>{
                        if(userData.exists()){
                            let data = userData.val()
                            data['userId'] = userId
                            
                            this.getPermissionLevelSnapshot(notesId, userId).then((permission) => {
                                data['permission'] = permission
                            })
                            
                            usersData.push(data)
                        }
                    }, {onlyOnce: true})
                }

                callback(usersData);
            }
        }, {onlyOnce: true});
    }

    changePermissionLevel(notesId: string, userId: string, permissionLevel: string){
        let updates: {[key : string] : any} = {}

        if(permissionLevel == 'noAccess'){
            updates[`notes-users/${notesId}/${userId}`] = null
            updates[`users-notes/${userId}/${notesId}`] = null
        }else{
            updates[`notes-users/${notesId}/${userId}`] = true
            updates[`users-notes/${userId}/${notesId}`] = permissionLevel
        }

        update(ref(this.db), updates)
    }

    getUserIdFromEmail(email: string){
        const usersRef = query(ref(this.db, `users`), ...[orderByChild("email"), equalTo(email)]);
        
        return new Promise((resolve) => {
            get(usersRef).then((snapshot) => {
                resolve(Object.keys(snapshot.val())[0]);
            });
        })

    }
}
