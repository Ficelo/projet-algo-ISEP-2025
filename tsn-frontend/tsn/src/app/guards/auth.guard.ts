import {CanActivate, Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService : UserService, private router : Router) {}

  canActivate(): Observable<boolean> {
    return this.userService.initUserFromSession().pipe(
      map((connected) => {
        if (connected) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }

}
