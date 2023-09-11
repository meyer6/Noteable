import { Component, Input } from '@angular/core';
import { TaskManager } from '../../task-manager';

@Component({
    selector: 'app-placeholder',
    templateUrl: './placeholder.component.html',
    styleUrls: ['./placeholder.component.css']
})
export class PlaceholderComponent {
	@Input() taskManager: TaskManager;
    @Input() currentLocation: Array<number>;
	
	once: boolean = false;
	isParent: boolean = false;
	isHoveredOver: boolean = false;
	pastDataLocation0: Array<number> = [-1];
	pastDataLocation1: Array<number> = [-1];

	ngOnChanges(){
		if (this.taskManager.beingDragged){
			if(this.taskManager.dataLocations[0].toString() != this.pastDataLocation0.toString()){
				if(this.currentLocation.slice(0, this.taskManager.dataLocations[0].length).toString() == this.taskManager.dataLocations[0].toString()){
					this.isParent = true
				}else{
					this.isParent = false
				}		
				this.pastDataLocation0 = this.taskManager.dataLocations[0]
			}
			if(this.taskManager.dataLocations[1].toString() != this.pastDataLocation1.toString()){
				if(this.currentLocation.toString() == this.taskManager.dataLocations[1].toString()){
					this.isHoveredOver = true
				}else{
					this.isHoveredOver = false
				}		
				this.pastDataLocation1 = this.taskManager.dataLocations[1]
			}
			this.once = true
		}else if (this.once){
			this.isParent = false
			this.isHoveredOver = false
			this.once = false
		}
	}
}
