import { child } from 'firebase/database';
import { Database, equalTo, get, getDatabase, off, onValue, orderByChild, query, ref, update } from 'firebase/database';

export class Sharing {
    db: Database = getDatabase()

    permissionLevel: string = 'noAccess';

    getPermissionLevelSnapshot(notesId: string, userId: string){
        return new Promise((resolve) => {
            // Gets the status given the user and the notes
            onValue(ref(this.db, `users-notes/${userId}/${notesId}`), (permissionLevel) => {
                // If the user is part of the notes then pass their permission level
                if(permissionLevel.exists()){
                    resolve(permissionLevel.val());
                }

                // Otherwise resolve to noAccess
                resolve('noAccess')
            }, {onlyOnce: true});
        })
    }

    getPermissionLevel(notesId: string, userId: string, callback: any){
        // Gets the status given the user and the notes
        onValue(ref(this.db, `users-notes/${userId}/${notesId}`), (permissionLevel) => {
            
            // If the user has access, change the permission level and perform the callback
            if(permissionLevel.exists()){
                this.permissionLevel = permissionLevel.val()
                callback(permissionLevel.val());

            // Otherwise they have no access
            }else{
                this.permissionLevel = 'noAccess'
                callback('noAccess');
            }
        });
    }

    getSharedPeople(notesId: string, callback: any){
        // Gets all users on the notes
        onValue(ref(this.db, `notes-users/${notesId}`), (peopleIds) => {
            if(peopleIds.exists()){
                let usersData: any = []

                // Loops through every user
                for(let userId of Object.keys(peopleIds.val())){

                    // Retrieves the users information
                    onValue(ref(this.db, `users/${userId}`), (userData) =>{
                        if(userData.exists()){

                            // Adds their user id to the data
                            let data = userData.val()
                            data['userId'] = userId
                            
                            // Adds the users permission level to the data
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

        // Changes the user's permission level
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
        // Gets all reference to users with the email
        const usersRef = query(ref(this.db, `users`), ...[orderByChild("email"), equalTo(email)]);
        
        return new Promise((resolve) => {
            // Calls the reference and extracts the information
            get(usersRef).then((snapshot) => {
                resolve(Object.keys(snapshot.val())[0]);
            });
        })
    }
}
