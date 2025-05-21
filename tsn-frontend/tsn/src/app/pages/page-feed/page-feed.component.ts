import {Component, OnInit} from '@angular/core';
import {PostComponent} from '../../components/post/post.component';
import {Menu} from 'primeng/menu';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {Card} from 'primeng/card';
import {Avatar} from 'primeng/avatar';
import {Button} from 'primeng/button';
import {User, UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {VerticalMenuComponent} from '../../components/vertical-menu/vertical-menu.component';
import {UserSuggestionComponent} from '../../components/user-suggestion/user-suggestion.component';
import {PostCreationPopupComponent} from '../../components/post-creation-popup/post-creation-popup.component';
import {Post, PostService} from '../../services/post.service';
import {NgForOf} from '@angular/common';
import {FeedComponent} from '../../components/feed/feed.component';
import {SearchbarComponent} from '../../components/searchbar/searchbar.component';

@Component({
  selector: 'app-page-feed',
  imports: [
    PostComponent,
    Menu,
    FloatLabel,
    InputText,
    Card,
    Avatar,
    Button,
    VerticalMenuComponent,
    UserSuggestionComponent,
    PostCreationPopupComponent,
    NgForOf,
    FeedComponent,
    SearchbarComponent
  ],
  templateUrl: './page-feed.component.html',
  standalone: true,
  styleUrl: './page-feed.component.scss'
})
export class PageFeedComponent implements OnInit{

  posts : Post[] = [];
  users : Record<string, User> = {};

  constructor(protected userService: UserService, protected router : Router, private postService : PostService) {}

  ngOnInit() {
    this.postService.getAllPosts().subscribe({
      next: (data) => {
        this.posts = data.reverse();
        for(let post of this.posts) {
          this.userService.getUser(post.username).subscribe({
            next: (usr) => {
              this.users[post.username] = usr;
            }
          })
        }
      }
    });

  }

  rechercher() {
    this.router.navigate(["recherche"], {queryParams : {r : "super recherche test"}})
  }

}


