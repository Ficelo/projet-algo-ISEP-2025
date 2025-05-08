import {Component} from '@angular/core';
import { Button } from 'primeng/button';
import {Test, TestService} from '../../services/test.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-page-test',
  imports: [
    Button,
    NgForOf
  ],
  templateUrl: './page-test.component.html',
  standalone: true,
  styleUrl: './page-test.component.scss'
})
export class PageTestComponent {

  constructor(private testService : TestService) {}

  tests : Test[] = [];

  getTests(): void {
    this.testService.getTest().subscribe(
      data => {
        this.tests = data;
      }
    )
  }

}
