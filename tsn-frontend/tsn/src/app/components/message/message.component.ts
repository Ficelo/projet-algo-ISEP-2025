import {booleanAttribute, Component, Input} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-message',
  imports: [
    NgIf
  ],
  templateUrl: './message.component.html',
  standalone: true,
  styleUrl: './message.component.scss'
})
export class MessageComponent {

  @Input() messageText : string = "";
  @Input() imageLink : string = "";
  @Input({transform: booleanAttribute}) fromSelf : boolean = false;

  isThereImage : boolean = true;

}
