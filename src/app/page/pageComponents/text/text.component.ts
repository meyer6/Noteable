import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-text',
    templateUrl: './text.component.html',
    styleUrls: ['./text.component.css', '../universal.css']
})
export class TextComponent {
    @Input() value: string;
}
