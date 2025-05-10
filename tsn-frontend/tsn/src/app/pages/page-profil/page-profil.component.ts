import { Component } from '@angular/core';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {PostComponent} from '../../components/post/post.component';
import {UserSuggestionComponent} from '../../components/user-suggestion/user-suggestion.component';
import {VerticalMenuComponent} from '../../components/vertical-menu/vertical-menu.component';
import {Router} from '@angular/router';
import {Avatar} from 'primeng/avatar';
import {Button} from 'primeng/button';
import {NgIf} from '@angular/common';

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
    NgIf
  ],
  templateUrl: './page-profil.component.html',
  standalone: true,
  styleUrl: './page-profil.component.scss'
})
export class PageProfilComponent {

  otherUser : boolean = true;

  constructor(protected router : Router) {
    // Faire un truc genre if u=null (query param d'un user)
    // Si c'est null on affiche le profil du user connecté => otherUser = false;
    // Sinon bah l'autre logique
  }

  rechercher() {
    this.router.navigate(["recherche"], {queryParams : {r : "super recherche test"}})
  }

}
