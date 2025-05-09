import {CanActivate, Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService : UserService, private router : Router) {}

  canActivate(): boolean {

    console.log("Connected ? : ", this.userService.isUserConnected());

    if(this.userService.isUserConnected()){
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
  }

}
