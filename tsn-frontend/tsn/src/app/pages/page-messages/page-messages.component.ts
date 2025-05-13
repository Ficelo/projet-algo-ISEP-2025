import { Component } from '@angular/core';
import {FriendlistItemComponent} from '../../components/friendlist-item/friendlist-item.component';
import {Avatar} from 'primeng/avatar';
import {MessageComponent} from '../../components/message/message.component';
import {NgForOf} from '@angular/common';
import {VerticalMenuComponent} from '../../components/vertical-menu/vertical-menu.component';
import {InputText} from 'primeng/inputtext';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-page-messages',
  imports: [
    FriendlistItemComponent,
    Avatar,
    MessageComponent,
    NgForOf,
    VerticalMenuComponent,
    InputText,
    Button
  ],
  templateUrl: './page-messages.component.html',
  standalone: true,
  styleUrl: './page-messages.component.scss'
})
export class PageMessagesComponent {

}
