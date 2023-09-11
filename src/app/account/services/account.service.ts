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
    errorMessage: string = '';
    db: Database = getDatabase()

    constructor(public router: Router) {    }

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
            const noteKey = push(child(ref(this.db), `users/${user.uid}/notes`)).key
            const updates: { [key: string]: any } = {}

            updates[`notes/${noteKey}`] =  {
                data: [{type: 'title', value: 'Start your first note'}],
                owner: user.uid
            }
            updates[`users/${user.uid}/notes`] =  [noteKey]
            update(ref(this.db), updates).then(() => {
                this.saveData(user);
            })
        });
    }

    saveData(user: UserDetails){
        if (user){
            localStorage.setItem('user', JSON.stringify(user));
            this.router.navigate(['home']);
        }
    }

    signOut() {
        return auth.signOut().then(() => {
            localStorage.removeItem('user');
            this.router.navigate(['']);
        });
    }
}

