import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {PostComponent} from '../../components/post/post.component';
import {UserSuggestionComponent} from '../../components/user-suggestion/user-suggestion.component';
import {VerticalMenuComponent} from '../../components/vertical-menu/vertical-menu.component';
import {NgIf} from '@angular/common';
import {FeedComponent} from "../../components/feed/feed.component";
import {SearchbarComponent} from '../../components/searchbar/searchbar.component';
import {Interest, UserService} from '../../services/user.service';
import {SelectButton} from 'primeng/selectbutton';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-page-recherche',
  imports: [
    FloatLabel,
    InputText,
    PostComponent,
    UserSuggestionComponent,
    VerticalMenuComponent,
    NgIf,
    FeedComponent,
    SearchbarComponent,
    SelectButton,
    FormsModule
  ],
  templateUrl: './page-recherche.component.html',
  standalone: true,
  styleUrls: ['./page-recherche.component.scss', '../page-feed/page-feed.component.scss']
})
export class PageRechercheComponent implements OnInit{

  recherche : string = "";
  userInterests : Interest[] = [];
  interestMap : Map<string, number> = new Map();
  value : string = "";

  constructor(private route : ActivatedRoute, protected router : Router, private userService : UserService) {
    this.route.queryParams.subscribe(params => {
      this.recherche = params['r'];
      console.log(this.recherche);
    });
  }

  get topFiveInterestKeys(): string[] {
    return Array.from(this.interestMap.keys()).slice(0, 5);
  }

  applyInterest() {
    this.recherche = this.value;  // update local variable so feed updates
    this.router.navigate(["recherche"], {queryParams : {r : this.value}})
  }

  ngOnInit() {

    let currentUser = this.userService.getCurrentUser();

    this.userService.getUserInterests(currentUser?.username || "").subscribe({
      next : (value) => {
        this.userInterests = value;

        for(let interest of this.userInterests) {
          if(this.interestMap.has(interest.interest)){
            let total = this.interestMap.get(interest.interest) || 0;
            this.interestMap.set(interest.interest, total + 1);
          } else {
            this.interestMap.set(interest.interest, 1);
          }
        }

        const sortedEntries = Array.from(this.interestMap.entries()).sort((a, b) => b[1] - a[1]);

        this.interestMap = new Map(sortedEntries);

        console.log("interest map", this.interestMap);

      }
    })

  }

  rechercher() {
    this.router.navigate(["recherche"], {queryParams : {r : "super recherche test"}})
  }

  isRecherche() : boolean {
    return this.recherche != "";
  }

}
