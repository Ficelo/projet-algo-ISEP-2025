import {Component, Input} from '@angular/core';
import {User, UserService} from '../../services/user.service';
import {FriendService} from '../../services/friend.service';
import {Button} from 'primeng/button';
import {Avatar} from 'primeng/avatar';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-suggestion',
  imports: [
    Button,
    Avatar,
    RouterLink
  ],
  templateUrl: './suggestion.component.html',
  standalone: true,
  styleUrl: './suggestion.component.scss'
})
export class SuggestionComponent {

  @Input() user : User;
  enabled : boolean = true;

  constructor(private userService : UserService, private friendService : FriendService) {
    this.user = {
      username : "",
      displayname : "",
      password : "",
      last_connection_date : new Date(),
      settings : {}
    }
  }



  addFriend(friendUsername : string) {

    const loggedInUserName = this.userService.getCurrentUser()?.username || "";

    this.friendService.addFriend(loggedInUserName, friendUsername).subscribe({
      next: (data) => {
        console.log("friend added", data);
        this.enabled = false;
      },
      error : (err) => {
        console.error(err);
      }
    });

  }

}
