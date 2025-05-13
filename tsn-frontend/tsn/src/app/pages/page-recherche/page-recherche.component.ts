import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {PostComponent} from '../../components/post/post.component';
import {UserSuggestionComponent} from '../../components/user-suggestion/user-suggestion.component';
import {VerticalMenuComponent} from '../../components/vertical-menu/vertical-menu.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-page-recherche',
  imports: [
    FloatLabel,
    InputText,
    PostComponent,
    UserSuggestionComponent,
    VerticalMenuComponent,
    NgIf
  ],
  templateUrl: './page-recherche.component.html',
  standalone: true,
  styleUrls: ['./page-recherche.component.scss', '../page-feed/page-feed.component.scss']
})
export class PageRechercheComponent {

  recherche : string = "";

  constructor(private route : ActivatedRoute, protected router : Router) {
    this.route.queryParams.subscribe(params => {
      this.recherche = params['r'];
      console.log(this.recherche);
    });
  }

  rechercher() {
    this.router.navigate(["recherche"], {queryParams : {r : "super recherche test"}})
  }

  isRecherche() : boolean {
    return this.recherche != undefined;
  }

}
