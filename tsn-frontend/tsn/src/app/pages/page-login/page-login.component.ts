import { Component } from '@angular/core';
import {FloatLabel} from 'primeng/floatlabel';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {NgIf} from '@angular/common';
import {User, UserService} from '../../services/user.service';

@Component({
  selector: 'app-page-login',
  imports: [
    FloatLabel,
    Button,
    InputText,
    NgIf
  ],
  templateUrl: './page-login.component.html',
  standalone: true,
  styleUrl: './page-login.component.scss'
})
export class PageLoginComponent {

  login: boolean = true;
  user : User;

  constructor(private userService : UserService) {
    this.user = {
      username : "",
      displayName: ""
    }
  }

  changeLogin() {
    this.login = !this.login;
  }

  connectUser() {
    // implémenter la logique de connexion
    this.userService.connectUser(this.user);
  }

  createUser() {
    // implementer la logique de création de compte
    this.connectUser();
  }

}
