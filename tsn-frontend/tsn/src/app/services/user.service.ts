import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

export interface User {
  "username": string;
  "displayName": string;
}

@Injectable({
  providedIn: "root"
})
export class UserService {

  private userConnected: boolean = false;
  private user : User | null = null;


  constructor(private http : HttpClient, private router : Router) {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.user = JSON.parse(savedUser);
      this.userConnected = true;
    }
  }

  isUserConnected() : boolean {
    return this.userConnected;
  }

  getUser() : User {
    return <User> this.user;
  }

  connectUser(user : User) {
    this.user = user;
    this.userConnected = true;
    this.router.navigate(["/"]);
    localStorage.setItem('user', JSON.stringify(user));
    console.log("Connecting")
  }

  logout() {
    this.userConnected = false;
    localStorage.removeItem('user');
    this.router.navigate(["/login"]);
  }

}
