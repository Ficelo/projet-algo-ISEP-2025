import {Component, Input, OnInit} from '@angular/core';
import {Card} from 'primeng/card';
import {Button} from 'primeng/button';
import {NgIf} from '@angular/common';
import {Avatar} from 'primeng/avatar';
import {RouterLink} from '@angular/router';

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
export class PostComponent {

  @Input() user : string = "";
  @Input() displayName : string ="";
  @Input() text: string = "";
  @Input() imageurl: string = "";

  postLiked : boolean = false;

  likePressed() {
    this.postLiked = !this.postLiked;
  }

}
