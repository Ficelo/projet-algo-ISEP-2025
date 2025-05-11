import {Component, Input} from '@angular/core';
import {Avatar} from 'primeng/avatar';

@Component({
  selector: 'app-friendlist-item',
  imports: [
    Avatar
  ],
  templateUrl: './friendlist-item.component.html',
  standalone: true,
  styleUrl: './friendlist-item.component.scss'
})
export class FriendlistItemComponent {

  @Input() username : string = "";
  @Input() lastActivity : string = "";

}
