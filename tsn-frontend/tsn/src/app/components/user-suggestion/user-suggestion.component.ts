import { Component } from '@angular/core';
import {Avatar} from 'primeng/avatar';
import {Card} from 'primeng/card';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-user-suggestion',
  imports: [
    Avatar,
    Card,
    Button
  ],
  templateUrl: './user-suggestion.component.html',
  standalone: true,
  styleUrl: './user-suggestion.component.scss'
})
export class UserSuggestionComponent {

}
