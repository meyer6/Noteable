import { NavigatorService } from './services/navigator.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {	
	// pageContent: 'Dashboard' | 'Notes' | 'Flashcards' | 'Settings' = 'Notes';

	constructor(public navigatorService: NavigatorService){}
}
