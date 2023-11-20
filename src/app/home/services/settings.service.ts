import { Injectable } from '@angular/core';
import { Database, getDatabase, onValue, ref, set } from 'firebase/database';
import { UserDetails } from 'src/app/account/interfaces/userInterfaces';
import { auth } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

	user: UserDetails;
	db: Database = getDatabase()

    constructor() { 
		this.getUserDetails()
	}

	getUserDetails(){
		const userId = JSON.parse(localStorage.getItem('user')!)?.uid

		// Retrieves the users information given their user id
		onValue(ref(this.db, `users/${userId}`), (user) => {
			this.user = user.val();
		})
	}

	changeProfilePicture(photoUrl: string){
		const userId = JSON.parse(localStorage.getItem('user')!)?.uid

		// Updates the link to the users profile picture
		set(ref(this.db, `users/${userId}/photoURL`), photoUrl);
	}

	deleteAccount(){
		// Deletes the current users account
		auth.currentUser?.delete()
	}
}
