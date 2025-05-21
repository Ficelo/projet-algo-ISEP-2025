import {Component, OnInit} from '@angular/core';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {PostComponent} from '../../components/post/post.component';
import {UserSuggestionComponent} from '../../components/user-suggestion/user-suggestion.component';
import {VerticalMenuComponent} from '../../components/vertical-menu/vertical-menu.component';
import {Router} from '@angular/router';
import {FriendlistItemComponent} from '../../components/friendlist-item/friendlist-item.component';
import {NgForOf} from '@angular/common';
import {Friend, FriendService} from '../../services/friend.service';
import {User, UserService} from '../../services/user.service';
import {DateService} from '../../services/date.service';
import {SearchbarComponent} from '../../components/searchbar/searchbar.component';

@Component({
  selector: 'app-page-amis',
  imports: [
    FloatLabel,
    InputText,
    PostComponent,
    UserSuggestionComponent,
    VerticalMenuComponent,
    FriendlistItemComponent,
    NgForOf,
    SearchbarComponent
  ],
  templateUrl: './page-amis.component.html',
  standalone: true,
  styleUrls: ['./page-amis.component.scss', '../page-feed/page-feed.component.scss']
})
export class PageAmisComponent implements OnInit{

  friends : User[] = []


  constructor(private router : Router, private friendService : FriendService, private userService : UserService, protected dateService : DateService) {
  }

  ngOnInit() {

    const currentUser = this.userService.getCurrentUser();

    this.friendService.getFriends(currentUser?.username || "").subscribe({
      next: (data) => {
        console.log(data);
        for (let friend of data){
          this.userService.getUser(friend.friend_username).subscribe({
            next: (user) => {
              this.friends.push(user);
            }
          })
        }
      }
    })

    console.log("friends", this.friends);

  }

  rechercher() {
    this.router.navigate(["recherche"], {queryParams : {r : "super recherche test"}})
  }

}
