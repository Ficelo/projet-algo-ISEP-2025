import { Component } from '@angular/core';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {PostComponent} from '../../components/post/post.component';
import {UserSuggestionComponent} from '../../components/user-suggestion/user-suggestion.component';
import {VerticalMenuComponent} from '../../components/vertical-menu/vertical-menu.component';
import {Router} from '@angular/router';
import {FriendlistItemComponent} from '../../components/friendlist-item/friendlist-item.component';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-page-amis',
  imports: [
    FloatLabel,
    InputText,
    PostComponent,
    UserSuggestionComponent,
    VerticalMenuComponent,
    FriendlistItemComponent,
    NgForOf
  ],
  templateUrl: './page-amis.component.html',
  standalone: true,
  styleUrls: ['./page-amis.component.scss', '../page-feed/page-feed.component.scss']
})
export class PageAmisComponent {

  constructor(private router : Router) {
  }

  rechercher() {
    this.router.navigate(["recherche"], {queryParams : {r : "super recherche test"}})
  }

}
