import { TaskManager } from './../task-manager';
import { Component, Input } from '@angular/core';
import { dataInstance } from '../dataFormat';

@Component({
    selector: 'app-recursive2',
    templateUrl: './recursive2.component.html',
    styleUrls: ['./recursive2.component.css']
})
export class Recursive2Component {
    @Input() data: Array<dataInstance>
	@Input() taskManager: TaskManager
    @Input() currentLocation: Array<number>
}
