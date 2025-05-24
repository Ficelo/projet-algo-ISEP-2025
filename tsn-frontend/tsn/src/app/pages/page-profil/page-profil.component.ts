import {Component, OnInit} from '@angular/core';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {PostComponent} from '../../components/post/post.component';
import {UserSuggestionComponent} from '../../components/user-suggestion/user-suggestion.component';
import {VerticalMenuComponent} from '../../components/vertical-menu/vertical-menu.component';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Avatar} from 'primeng/avatar';
import {Button} from 'primeng/button';
import {NgIf} from '@angular/common';
import {FeedComponent} from "../../components/feed/feed.component";
import {User, UserService} from '../../services/user.service';
import {Friend, FriendService} from '../../services/friend.service';
import {SearchbarComponent} from '../../components/searchbar/searchbar.component';

@Component({
  selector: 'app-page-profil',
  imports: [
    FloatLabel,
    InputText,
    PostComponent,
    UserSuggestionComponent,
    VerticalMenuComponent,
    Avatar,
    Button,
    NgIf,
    FeedComponent,
    SearchbarComponent,
    RouterLink
  ],
  templateUrl: './page-profil.component.html',
  standalone: true,
  styleUrl: './page-profil.component.scss'
})
export class PageProfilComponent implements OnInit{

  user : User | null = null;
  otherUser : boolean = false;
  friends : Friend[] | null = [];

  constructor(protected router : Router, private route : ActivatedRoute, private userService : UserService, private friendService : FriendService) {
    // Faire un truc genre if u=null (query param d'un user)
    // Si c'est null on affiche le profil du user connecté => otherUser = false;
    // Sinon bah l'autre logique
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      let username = params.get("username");
      if(!username) {username = this.userService.getCurrentUser()?.username || ""}
      this.userService.getUser(username).subscribe({
        next: (data) => {
          this.user = data;
          console.log("user in profil :", this.user);
        }
      })
      this.friendService.getFriends(username).subscribe({
        next: (data) => {
          this.friends = data;
        }
      })
    });
  }

  rechercher() {
    this.router.navigate(["recherche"], {queryParams : {r : "super recherche test"}})
  }

}
