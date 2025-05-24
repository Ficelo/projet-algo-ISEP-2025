import {Component, Input, OnInit} from '@angular/core';
import {Card} from 'primeng/card';
import {Button} from 'primeng/button';
import {NgIf} from '@angular/common';
import {Avatar} from 'primeng/avatar';
import {RouterLink} from '@angular/router';
import {Post, PostService} from '../../services/post.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-post',
  imports: [
    Card,
    Button,
    NgIf,
    Avatar,
    RouterLink
  ],
  templateUrl: './post.component.html',
  standalone: true,
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit{

  @Input() user : string = "";
  @Input() displayName : string ="";
  @Input() text: string = "";
  @Input() imageurl: string = "";

  @Input() post : Post  = {
    id : "0",
    username : "",
    date : new Date(),
    text : "",
    image : ""
  };

  postLiked : boolean = false;

  constructor(private postService : PostService, private userService : UserService) {}

  ngOnInit() {

    const currentUsername = this.userService.getCurrentUser()?.username || "";
    console.log("user in post", currentUsername);

    this.postService.getAllLikesOfPost(this.post.id).subscribe({
      next: (data) => {
        for( let like of data) {
          if(like.username == currentUsername ) {
            this.postLiked = true;
          }
        }
      }
    })

  }

  likePressed() {
    this.postLiked = !this.postLiked;

    const currentUsername = this.userService.getCurrentUser()?.username || "";

    if(this.postLiked) {
      this.postService.postLike(this.post.id, currentUsername).subscribe()
    }

  }

}
