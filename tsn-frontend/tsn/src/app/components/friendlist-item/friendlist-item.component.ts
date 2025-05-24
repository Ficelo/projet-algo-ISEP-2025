import {Component, Input} from '@angular/core';
import {Avatar} from 'primeng/avatar';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-friendlist-item',
  imports: [
    Avatar,
    RouterLink
  ],
  templateUrl: './friendlist-item.component.html',
  standalone: true,
  styleUrl: './friendlist-item.component.scss'
})
export class FriendlistItemComponent {

  @Input() username : string = "";
  @Input() displayName : string = "";
  @Input() lastActivity : string = "";

  protected readonly navigator = navigator;
}
