import {Component, OnInit} from '@angular/core';
import {Avatar} from 'primeng/avatar';
import {Card} from 'primeng/card';
import {Button} from 'primeng/button';
import {User, UserService} from '../../services/user.service';
import {NgForOf, NgIf} from '@angular/common';
import {FriendService} from '../../services/friend.service';

@Component({
  selector: 'app-user-suggestion',
  imports: [
    Avatar,
    Card,
    Button,
    NgForOf,
    NgIf
  ],
  templateUrl: './user-suggestion.component.html',
  standalone: true,
  styleUrl: './user-suggestion.component.scss'
})
export class UserSuggestionComponent implements OnInit{

  users : User[] = [];

  constructor(private userService : UserService, private friendService : FriendService) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe({
      next: (data) => {

        // TODO : ALGORITHME DE RECOMMENDATION

        const loggedInUserName = this.userService.getCurrentUser()?.username || "";

        for (let user of data) {
          if(user.username != loggedInUserName) {
            this.users.push(user);
          }
        }

        // this.users = data;
        console.log(data);
      }
    })
  }

  addFriend(friendUsername : string) {

    const loggedInUserName = this.userService.getCurrentUser()?.username || "";

    this.friendService.addFriend(loggedInUserName, friendUsername).subscribe({
      next: (data) => {
        console.log("friend added", data);
      },
      error : (err) => {
        console.error(err);
    }
    });

  }
}
