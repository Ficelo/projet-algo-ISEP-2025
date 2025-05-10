import { Component } from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-vertical-menu',
  imports: [],
  templateUrl: './vertical-menu.component.html',
  standalone: true,
  styleUrl: './vertical-menu.component.scss'
})
export class VerticalMenuComponent {

  constructor(protected router : Router, protected userService : UserService) {}

}
