import { Component } from '@angular/core';
import {FloatLabel} from 'primeng/floatlabel';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {NgIf} from '@angular/common';
import {User, UserService} from '../../services/user.service';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PasswordDirective} from 'primeng/password';

@Component({
  selector: 'app-page-login',
  imports: [
    FloatLabel,
    Button,
    InputText,
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    PasswordDirective
  ],
  templateUrl: './page-login.component.html',
  standalone: true,
  styleUrl: './page-login.component.scss'
})
export class PageLoginComponent {

  login: boolean = true;
  user : User;

  usernameLoginControl = new FormControl("");
  passwordLoginControl = new FormControl("");

  usernameControl = new FormControl("");
  displayNameControl = new FormControl("");
  passwordControl = new FormControl("");

  constructor(private userService : UserService) {
    this.user = {
      username : "",
      displayname: "",
      password: "",
      settings: {},
      last_connection_date : new Date()
    }
  }

  changeLogin() {
    this.login = !this.login;
  }

  connectUser() {
    if(this.getFormCompletedLogIn()){
      this.userService.connectUser(this.usernameLoginControl.value || "", this.passwordLoginControl.value || "");
    }
  }

  createUser() {

    // TODO : mettre une vérification que c'es unique


    if(this.getFormCompletedSignIn()){
      this.user.username = this.usernameControl.value || "";
      this.user.displayname = this.displayNameControl.value || "";
      this.user.password = this.passwordControl.value || "";
    }

    this.userService.createUser(this.user).subscribe({
      next: (res) => {
        console.log("User created:", res);
        this.connectUser();
      },
      error: (err) => {
        console.error("Error creating user:", err);
      }
    });

    this.login = true;
    //this.connectUser();
  }

  getFormCompletedLogIn() {
    return !!(this.usernameLoginControl.value && this.passwordLoginControl.value);
  }

  getFormCompletedSignIn() {
    return !!(this.usernameControl.value && this.displayNameControl.value && this.passwordControl.value);
  }
}
