import { FormControl, Validators } from '@angular/forms';

export class UserLogin {
    email: FormControl;
    password: FormControl;
    constructor() {
        this.email = new FormControl('', [Validators.required, Validators.email]);
        this.password = new FormControl('', [Validators.required]);
    }
}

export interface UserDetails {
    uid: string;
    email: string | null;
    photoURL: string | null;
}