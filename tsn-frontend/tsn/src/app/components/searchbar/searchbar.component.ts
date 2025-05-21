import { Component } from '@angular/core';
import {Router} from '@angular/router';
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
export class SearchbarComponent {

  searchControl = new FormControl("");

  constructor(protected router : Router) {
  }

  rechercher() {
    this.router.navigate(["recherche"], {queryParams : {r : this.searchControl.value}})
  }
}
