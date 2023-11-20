import { noteInstance } from 'src/app/notes/interfaces/noteTemplate';
import { DashboardService } from './../../services/dashboard.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

	// Contains notes that contain the pages that the user has access to
	myNotes: noteInstance[] = [{type: 'title', value: 'My Notes', content: []}];
	sharedNotes: noteInstance[] = [{type: 'title', value: 'Shared Notes', content: []}]

	dividerDiff: number = 0;

	constructor(private dashboardService: DashboardService){ }

	// Retrieves the pages and saves them to the arrays
	ngOnInit(){
		this.dashboardService.getPages(this.myNotes, this.sharedNotes)
	}

	moveDivider(event: MouseEvent){
		const initialDividerDiff = this.dividerDiff
		const startX = event.clientX;

		const recordCoords = (event: MouseEvent) => {
			this.dividerDiff = Math.max(-175, Math.min(175, initialDividerDiff + event.clientX - startX))
		}
		document.addEventListener('mousemove', recordCoords)
		document.addEventListener('mouseup', () => {
			document.removeEventListener('mousemove', recordCoords)
		}, {once: true})
	}
}
