import { Component, Input } from '@angular/core';
import { dataInstance } from '../../page2/dataFormat';
import { Functions } from '../functions';
@Component({
    selector: 'app-page-component-sorter',
    templateUrl: './page-component-sorter.component.html',
    styleUrls: ['./page-component-sorter.component.css']
})
export class PageComponentSorterComponent {
	@Input() data: dataInstance;
    @Input() taskManager: Functions;
}
