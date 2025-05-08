import {Component} from '@angular/core';
import {PostComponent} from '../../components/post/post.component';
import {Menu} from 'primeng/menu';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {Card} from 'primeng/card';
import {Avatar} from 'primeng/avatar';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-page-feed',
  imports: [
    PostComponent,
    Menu,
    FloatLabel,
    InputText,
    Card,
    Avatar,
    Button
  ],
  templateUrl: './page-feed.component.html',
  standalone: true,
  styleUrl: './page-feed.component.scss'
})
export class PageFeedComponent {

}


