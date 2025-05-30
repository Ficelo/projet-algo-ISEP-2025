import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {catchError, map, Observable, of, tap} from 'rxjs';
import {MessageService} from 'primeng/api';

export interface User {
  username : string,
  displayname : string,
  password : string,
  settings : {
    description? : string,
  },
  last_connection_date : Date,
}

export interface Interest {
  username : string,
  interest : string
}

@Injectable({
  providedIn: "root"
})
export class UserService {

  private userConnected: boolean = false;
  private user: User | null = null;
  private userInitialized = false;
  private apiPath = "http://localhost:3000/api/users"

  constructor(private http : HttpClient, private router : Router, private messageService : MessageService) {
    const savedUsername = sessionStorage.getItem('username');
    if (savedUsername) {
      this.getUser(savedUsername).subscribe(user => {
        this.user = user;
        this.userConnected = true;
      });
    }

  }

  initUserFromSession(): Observable<boolean> {
    const username = sessionStorage.getItem('username');
    if (!username) {
      this.userInitialized = true;
      return of(false);
    }

    return this.getUser(username).pipe(
      tap(user => {
        this.user = user;
        this.userConnected = true;
        this.userInitialized = true;
      }),
      map(() => true),
      catchError(() => {
        this.userInitialized = true;
        return of(false);
      })
    );
  }

  isUserInitialized(): boolean {
    return this.userInitialized;
  }

  isUserConnected() : boolean {
    return this.userConnected;
  }

  getCurrentUser(): User | null {
    return this.user;
  }


  getUser(username : string) : Observable<User> {
    //console.log(`${this.apiPath}/${encodeURIComponent(username)}`);
    return this.http.get<User>(`${this.apiPath}/${encodeURIComponent(username)}`);
  }

  getUserInterests(username : string) {
    return this.http.get<Interest[]>(`${this.apiPath}/${encodeURIComponent(username)}/tags`)
  }

  getAllUsers() {
    return this.http.get<User[]>(this.apiPath);
  }

  connectUser(username : string, password: string) {

   this.getUser(username).subscribe({
     next: (data) => {

       console.log(data);

       if(data.password != password){
         this.messageService.add({severity : 'error', summary: 'Error', detail: 'Username or password is incorrect.'});
         return;
       }

       this.user = data;
       this.userConnected = true;
       sessionStorage.setItem('username', data.username);
       this.router.navigate(["/"]);
       //localStorage.setItem('user', JSON.stringify(this.user));
     },
     error : (err) => {
       console.log(err);
     }
   })


  }

  logout() {
    this.userConnected = false;
    localStorage.removeItem('user');
    this.router.navigate(["/login"]);
  }

  createUser(user : User) {
    return this.http.post<User>(this.apiPath, {
      "username": user.username,
      "displayname": user.displayname,
      "password": user.password,
      "settings": user.settings,
      "last_connection_date": user.last_connection_date.toISOString()
    });
  }

  updateUser(username: string, updates: Partial<User>) {
    console.log("updateing");
    return this.http.put(`${this.apiPath}/${encodeURIComponent(username)}`, updates);
  }

  updateUserInterests(username: string, interests: string[]) {
    return this.http.put(`${this.apiPath}/${encodeURIComponent(username)}/interests`, {
      interests: interests
    });
  }

  deleteUserInterest(username: string, interest: string) {
    return this.http.delete(`${this.apiPath}/${encodeURIComponent(username)}/interests/${encodeURIComponent(interest)}`);
  }


  addUserInterest(username: string, interest: string) {
    return this.http.post(`${this.apiPath}/${encodeURIComponent(username)}/interests`, { interest });
  }



}
