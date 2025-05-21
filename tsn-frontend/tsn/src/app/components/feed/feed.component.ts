import {Component, Input, OnInit} from '@angular/core';
import {Post, PostService} from '../../services/post.service';
import {User, UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {PostComponent} from '../post/post.component';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-feed',
  imports: [
    PostComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './feed.component.html',
  standalone: true,
  styleUrl: './feed.component.scss'
})
export class FeedComponent implements OnInit{

  posts : Post[] = []
  users : Record<string, User> = {};

  @Input() username : string | undefined = "";
  @Input() search : string | undefined = "";

  constructor(protected userService : UserService, protected router : Router, private postService : PostService) {
  }

  ngOnInit() {
    this.postService.getAllPosts().subscribe({
      next: (data) => {
        for(let post of data) {
          this.userService.getUser(post.username).subscribe({
            next: (usr) => {
              this.users[post.username] = usr;
            }
          })

          if(this.username && this.username == post.username){
            this.posts.push(post);
          }

          if(this.search && post.text.includes(this.search)){
            this.posts.push(post);
          }

          if(!this.username && !this.search){
            this.posts.push(post);
          }

        }
        this.posts = this.posts.reverse();
      }
    });
  }

}
