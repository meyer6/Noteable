import { Injectable } from '@angular/core';
import { signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword, GoogleAuthProvider, getAdditionalUserInfo } from "firebase/auth";
import { auth } from '../../../environments/environment'
import { Database, child, getDatabase, push, ref, set, update} from "firebase/database";
import { Router } from '@angular/router';
import { UserDetails } from '../interfaces/userInterfaces';

@Injectable({
    providedIn: 'root',
})
export class AccountService {
    // Contains error message for when input is incorrect
    errorMessage: string = '';

    // Gets the database from firebase
    db: Database = getDatabase()

    // Initialises the router module
    constructor(public router: Router) { }

    // Sign in with email/password
    signIn(email: string, password: string) {
        signInWithEmailAndPassword(auth, email, password)

        .then((userCredential) => {
            const user = userCredential.user;
            this.saveData(user);
        })

        .catch((error) => {
            if (error.code == "auth/wrong-password"){
                this.errorMessage = "wrongPassword";
            }else if(error.code == "auth/user-not-found"){
                this.errorMessage = "emailNotFound";
            }
        });
    }
  
    // Sign up with email/password
    signUp(email: string, password: string) {
        createUserWithEmailAndPassword(auth, email, password)

        .then((userCredential) => {
            const user = userCredential.user;
            this.setUserData(user);
        })

        .catch((error) => {
            if (error.code == "auth/email-already-in-use"){
                this.errorMessage = "emailInUse";
            }else if(error.code == "auth/weak-password"){
                this.errorMessage = "weakPassword";
            }
        });
    }

    // Sign in with Google
    googleAuth() {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            if(credential !== null){
                const user = result.user;
                if(getAdditionalUserInfo(result)?.isNewUser == true){
                    this.setUserData(user);
                }else{
                    this.saveData(user);
                }
            }
        }).catch((error) => {});    
    }

    setUserData(user: UserDetails) { 
        set(ref(this.db, `users/${user.uid}`), {
            email: user.email,
            photoURL: user.photoURL == undefined ? 'assets/pfp.png' : user.photoURL,
        }).then(() => {
            const noteId = push(child(ref(this.db), 'notes')).key

            const updates: { [key: string]: any } = {}
            updates[`notes/${noteId}`] = [{type: 'title', value: 'Your first Noteable!!!'}, {type: 'text', value: 'Start Typing'}]
            updates[`users-notes/${user.uid}/${noteId}`] = "Owner"
            updates[`notes-users/${noteId}/${user.uid}`] = true

            // updates[`users/${user.uid}/notes`] =  [noteKey]
            update(ref(this.db), updates).then(() => {
                this.saveData(user);
            })
        });
    }

    saveData(user: UserDetails){
        if (user){
            // Saves the user's data to local storage for future use
            localStorage.setItem('user', JSON.stringify(user));

            // Redirects the user to the home page
            this.router.navigate(['Dashboard']);
        }
    }

    signOut(){
        return auth.signOut().then(() => {
            // Removes the user's details and redirects them to the login page
            localStorage.removeItem('user');
            this.router.navigate(['']);
        });
    }
}

