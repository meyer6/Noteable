import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';

@Injectable({
    providedIn: 'root'
})
export class AccountGuard implements CanActivate {
    constructor(
        public accountService: AccountService,
        public router: Router
    ){ }

    canActivate(){		
        // Retrieves user information
		let user = JSON.parse(localStorage.getItem('user')!);
		
        // If it is undefined, i.e the user has not logged in
        // It redirects them to the account screen
        if(user == null) {
			this.router.navigate([''])
		}
        return true;
    }
}
