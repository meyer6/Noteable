import { NavigatorService } from 'src/app/home/services/navigator.service';
import { NotesService } from '../../services/notes.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent {

    titles: string[] = [];

	constructor(
		public notesService: NotesService,
		private navigatorService: NavigatorService
	) {}

	ngOnInit() {
		for(let id of this.notesService.notesIdPath){
			this.notesService.getTitleFromPageId(id).then((title: string) => {
				this.titles.push(title)
			})
		}
	}

	move(index: number){
		this.navigatorService.moveToNotes(this.notesService.notesIdPath.slice(0, index + 1).join('/'))
	}
}
