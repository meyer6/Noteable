import { Component } from '@angular/core';
import { AccountService } from './services/account.service'
import { UserLogin } from './interfaces/userInterfaces'

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})
export class AccountComponent {
    // Determines whether the password is shown or not
    showPassword: boolean = true;

    // Initialises the user's information
    user: UserLogin;
	authenticationType: string = "createAccount";
	
    // Initalises the account service
    constructor(public accountService: AccountService) {
        this.user = new UserLogin();
    }
}
