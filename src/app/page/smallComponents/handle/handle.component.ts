import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-handle',
    templateUrl: './handle.component.html',
    styleUrls: ['./handle.component.css']
})
export class HandleComponent {
    @Input() startDraggingMethod: any;
	@Input() viewHandleMethod: any;
	@Input() unviewHandleMethod: any;

	startDragging(event: MouseEvent){
		this.startDraggingMethod.startDragging(event);
	}
	viewHandle(event: MouseEvent){
		this.viewHandleMethod.viewHandle(event);
	}
	unviewHandle(event: MouseEvent){
		this.unviewHandleMethod.unviewHandle(event);
	}
}
