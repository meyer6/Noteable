import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-sub-heading',
    templateUrl: './sub-heading.component.html',
    styleUrls: ['./sub-heading.component.css', '../universal.css']
})
export class SubHeadingComponent {
  	@Input() value: string;
	@Input() content: any;
}
