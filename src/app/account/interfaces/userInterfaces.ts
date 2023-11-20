import { FormControl, Validators } from '@angular/forms';

// Used for the user login form
export class UserLogin {
    email: FormControl;
    password: FormControl;
    constructor() {
        this.email = new FormControl('', [Validators.required, Validators.email]);
        this.password = new FormControl('', [Validators.required]);
    }
}

// Used as a format to store relevant user details 
export interface UserDetails {
    uid: string;
    email: string | null;
    photoURL: string | null;
}