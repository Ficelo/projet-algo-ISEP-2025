import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface Friend {
  user_username : string;
  friend_username : string;
}

export interface Suggestion {
  suggestion : string;
}

@Injectable({
  providedIn: "root"
})
export class FriendService {

  private apiUrl = "http://localhost:3000/api/users"

  constructor(private http : HttpClient) {}

  addFriend(usernameAdding : string, usernameAdded : string) {
    return this.http.post<Friend>(`${this.apiUrl}/${encodeURIComponent(usernameAdding)}/friends`, {
      username : usernameAdding,
      friendUsername : usernameAdded
    });
  }

  getFriends(username : string) {
    return this.http.get<Friend[]>(`${this.apiUrl}/${encodeURIComponent(username)}/friends`);
  }

  getRecommendedFriendsFromOtherFriends(username: string) {
    return this.http.get<Suggestion[]>(`${this.apiUrl}/${encodeURIComponent(username)}/recommended-foaf`);
  }

  getRecommendedFriendsFromInterests(username: string) {
    return this.http.get<Suggestion[]>(`${this.apiUrl}/${encodeURIComponent(username)}/recommended-interests`);
  }

}
