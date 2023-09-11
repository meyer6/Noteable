import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';

@Injectable({
    providedIn: 'root'
})
export class LogoutGuard implements CanActivate {
    constructor(public accountService: AccountService){ }

    canActivate(){
		let user = JSON.parse(localStorage.getItem('user')!);
		if(user != null) {
			this.accountService.signOut()
		}
        return true;
    }
    
}
