import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-bullet-points',
    templateUrl: './bullet-points.component.html',
    styleUrls: ['./bullet-points.component.css', '../universal.css']
})
export class BulletPointsComponent {
    @Input() value: string;
	@Input() content: any;
}
