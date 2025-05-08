import {Component, Input, OnInit} from '@angular/core';
import {Card} from 'primeng/card';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-post',
  imports: [
    Card,
    Button
  ],
  templateUrl: './post.component.html',
  standalone: true,
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit{

  @Input() user : string = "";
  @Input() text: string = "";
  @Input() imageurl: string = "";

  imageHidden : boolean = false;
  postLiked : boolean = false;

  ngOnInit() {
    if(this.imageurl == ""){
      this.imageHidden = true;
    }
  }

  likePressed() {
    this.postLiked = !this.postLiked;
  }

}
