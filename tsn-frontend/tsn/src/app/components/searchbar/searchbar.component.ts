import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  imports: [
    FloatLabel,
    InputText,
    ReactiveFormsModule
  ],
  templateUrl: './searchbar.component.html',
  standalone: true,
  styleUrl: './searchbar.component.scss'
})
export class SearchbarComponent implements OnInit{

  searchControl = new FormControl("");

  constructor(protected router : Router, private route : ActivatedRoute) {
  }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      const searchParam = params['r'];
      if (searchParam) {
        this.searchControl.setValue(searchParam);
      }
    });

  }

  rechercher() {
    this.router.navigate(["recherche"], {queryParams : {r : this.searchControl.value}})
  }
}
