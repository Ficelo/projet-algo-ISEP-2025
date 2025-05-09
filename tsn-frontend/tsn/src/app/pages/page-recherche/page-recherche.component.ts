import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-page-recherche',
  imports: [],
  templateUrl: './page-recherche.component.html',
  standalone: true,
  styleUrl: './page-recherche.component.scss'
})
export class PageRechercheComponent {

  recherche : string = "";

  constructor(private route : ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.recherche = params['r'];
    });
  }

}
