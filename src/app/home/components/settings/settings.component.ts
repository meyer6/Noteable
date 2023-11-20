import { SettingsService } from './../../services/settings.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
	
	constructor(public settingsService: SettingsService){}

	changeProfilePicture(photoUrl: string){
		if(photoUrl.length != 0){
			this.settingsService.changeProfilePicture(photoUrl)
		}
	}
}
