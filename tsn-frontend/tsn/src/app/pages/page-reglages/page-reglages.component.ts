import { Component } from '@angular/core';
import {Avatar} from 'primeng/avatar';
import {Button} from 'primeng/button';
import {FriendlistItemComponent} from '../../components/friendlist-item/friendlist-item.component';
import {InputText} from 'primeng/inputtext';
import {MessageComponent} from '../../components/message/message.component';
import {NgForOf} from '@angular/common';
import {VerticalMenuComponent} from '../../components/vertical-menu/vertical-menu.component';

@Component({
  selector: 'app-page-reglages',
  imports: [
    Avatar,
    Button,
    FriendlistItemComponent,
    InputText,
    MessageComponent,
    NgForOf,
    VerticalMenuComponent
  ],
  templateUrl: './page-reglages.component.html',
  standalone: true,
  styleUrls: ['./page-reglages.component.scss', '../page-reglages/page-reglages.component.scss']
})
export class PageReglagesComponent {

}
