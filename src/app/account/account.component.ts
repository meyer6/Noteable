import { Component } from '@angular/core';
import { AccountService } from './services/account.service'
import { UserLogin
 } from './interfaces/userInterfaces'
@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})
export class AccountComponent {
    showPassword: boolean = true;

    user: UserLogin;
	authenticationType: string = "createAccount";
	
    constructor(public accountService: AccountService) {
        this.user = new UserLogin();
    }
}
