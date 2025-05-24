import {Component, Input, OnInit} from '@angular/core';
import {Post, PostService} from '../../services/post.service';
import {User, UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {PostComponent} from '../post/post.component';
import {NgForOf, NgIf} from '@angular/common';
import {forkJoin} from 'rxjs';

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
export class FeedComponent implements OnInit {

  posts: Post[] = []
  users: Record<string, User | undefined> = {};

  @Input() username: string | undefined = "";
  @Input() search: string | undefined = "";
  @Input() interests: string[] | undefined = [];

  constructor(protected userService: UserService, protected router: Router, private postService: PostService) {
  }

  // No troll c'est de la magie noire ce que j'ai pondu
  // Vaut mieux plus toucher tant que ça marche

  ngOnInit() {
    if (this.search) {
      this.postService.getPostsBySearchAndTag(this.search).subscribe({
        next: (data) => {
          const userObservables = data.map(post =>
            this.userService.getUser(post.username)
          );

          forkJoin(userObservables).subscribe({
            next: (users : User[]) => {
              users.forEach((usr, i) => {
                const post = data[i];
                this.users[post.username] = usr;
                this.posts.push(post);
              });
              this.posts = this.posts.reverse();
            }
          });
        }
      });
    } else {
      this.postService.getAllPosts().subscribe({
        next: (data) => {
          const userObservables = data.map(post =>
            this.userService.getUser(post.username)
          );

          forkJoin(userObservables).subscribe({
            next: (users: User[]) => {
              users.forEach((usr, i) => {
                const post = data[i];
                this.users[post.username] = usr;

                if (this.username && this.username === post.username) {
                  this.posts.push(post);
                }

                if (!this.username && !this.search) {
                  this.posts.push(post);
                }
              });
              this.posts = this.posts.reverse();
            }
          });
        }
      });
    }
  }
}
