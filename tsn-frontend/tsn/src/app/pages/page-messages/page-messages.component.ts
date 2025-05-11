import { Component } from '@angular/core';
import {FriendlistItemComponent} from '../../components/friendlist-item/friendlist-item.component';
import {Avatar} from 'primeng/avatar';
import {MessageComponent} from '../../components/message/message.component';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-page-messages',
  imports: [
    FriendlistItemComponent,
    Avatar,
    MessageComponent,
    NgForOf
  ],
  templateUrl: './page-messages.component.html',
  standalone: true,
  styleUrl: './page-messages.component.scss'
})
export class PageMessagesComponent {

}
