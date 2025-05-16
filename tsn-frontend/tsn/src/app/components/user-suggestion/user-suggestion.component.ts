import {Component, OnInit} from '@angular/core';
import {Avatar} from 'primeng/avatar';
import {Card} from 'primeng/card';
import {Button} from 'primeng/button';
import {User, UserService} from '../../services/user.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-user-suggestion',
  imports: [
    Avatar,
    Card,
    Button,
    NgForOf
  ],
  templateUrl: './user-suggestion.component.html',
  standalone: true,
  styleUrl: './user-suggestion.component.scss'
})
export class UserSuggestionComponent implements OnInit{

  users : User[] = [];

  constructor(private userService : UserService) {}


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
}
