import {Component, OnChanges, OnInit} from '@angular/core';
import {FriendlistItemComponent} from '../../components/friendlist-item/friendlist-item.component';
import {Avatar} from 'primeng/avatar';
import {MessageComponent} from '../../components/message/message.component';
import {NgClass, NgForOf} from '@angular/common';
import {VerticalMenuComponent} from '../../components/vertical-menu/vertical-menu.component';
import {InputText} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {Friend, FriendService} from '../../services/friend.service';
import {User, UserService} from '../../services/user.service';
import {Message, MessageService} from '../../services/messages.service';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {interval, Subscription} from 'rxjs';

@Component({
  selector: 'app-page-messages',
  imports: [
    FriendlistItemComponent,
    Avatar,
    MessageComponent,
    NgForOf,
    VerticalMenuComponent,
    InputText,
    Button,
    NgClass,
    ReactiveFormsModule
  ],
  templateUrl: './page-messages.component.html',
  standalone: true,
  styleUrl: './page-messages.component.scss'
})
export class PageMessagesComponent implements OnInit{

  friends : User[] = [];
  currentTarget : string = "";
  messages : Message[] = [];
  currentUsername : string = "";
  messageText  = new FormControl("");
  messageSub : Subscription = new Subscription();

  constructor(private userService : UserService, private friendService : FriendService, private messageService : MessageService) {

  }

  ngOnInit() {

    let currentUser = this.userService.getCurrentUser()
    this.currentUsername = currentUser?.username || "";

    this.friendService.getFriends(currentUser?.username || "").subscribe({
      next : (value) => {
        for(let friend of value){
          this.userService.getUser(friend.friend_username).subscribe({
            next : (value) => {
              this.friends.push(value);
              this.currentTarget = this.friends[0].username;
              this.getMessages();
              console.log(this.currentUsername)
            }
          })
        }
      }
    });

    this.messageSub = interval(500).subscribe(() => {
      this.getMessages();
    })

  }

  getMessages() {
    let currentUser = this.userService.getCurrentUser()

    this.messageService.getMessages(currentUser?.username || "", this.currentTarget).subscribe({
      next : (value) => {
        this.messages = value;
        console.log(this.messages)
      }
    })

  }

  postMessage() {
    if(this.messageText.value != "") {
      this.messageService.sendMessage(this.currentUsername, this.currentTarget, this.messageText.value || "").subscribe(
        {
          next : (value) => {
            console.log(value)
            this.messageText.setValue("");
          }
        }
      );
    }
  }

  setCurrentTarget(username : string) {
    this.currentTarget = username;
    this.getMessages();
  }

}
