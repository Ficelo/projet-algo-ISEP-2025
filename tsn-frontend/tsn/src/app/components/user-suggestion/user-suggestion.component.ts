import {Component, OnInit} from '@angular/core';
import {Avatar} from 'primeng/avatar';
import {Card} from 'primeng/card';
import {Button} from 'primeng/button';
import {User, UserService} from '../../services/user.service';
import {NgForOf, NgIf} from '@angular/common';
import {FriendService} from '../../services/friend.service';
import {SuggestionComponent} from '../suggestion/suggestion.component';
import {Divider} from 'primeng/divider';

@Component({
  selector: 'app-user-suggestion',
  imports: [
    Avatar,
    Card,
    Button,
    NgForOf,
    NgIf,
    SuggestionComponent,
    Divider
  ],
  templateUrl: './user-suggestion.component.html',
  standalone: true,
  styleUrl: './user-suggestion.component.scss'
})
export class UserSuggestionComponent implements OnInit{

  usersFOAF : User[] = [];
  usersInterests : User[] = [];

  constructor(private userService : UserService, private friendService : FriendService) {}

  ngOnInit() {

    const loggedInUserName = this.userService.getCurrentUser()?.username || "";

    this.friendService.getRecommendedFriendsFromOtherFriends(loggedInUserName).subscribe({
      next: (friends) => {
       for(let friend of friends) {
         console.log(friend);
         this.userService.getUser(friend.suggestion).subscribe({
           next: (data) => {
               if(data.username != loggedInUserName && !this.usersInterests.includes(data)) {
                 this.usersFOAF.push(data);
               }
             // this.users = data;
             //console.log(data);
           }
         })
       }
      }
    });

    this.friendService.getRecommendedFriendsFromInterests(loggedInUserName).subscribe({
      next : (friends) => {
        for( let friend of friends) {
          this.userService.getUser(friend.suggestion).subscribe({
            next: (data) => {
              if(data.username != loggedInUserName && !this.usersFOAF.includes(data)) {
                this.usersInterests.push(data);
              }
            }
          })
        }
      }
    })

  }


}
