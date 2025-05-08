import { Routes } from '@angular/router';
import {PageTestComponent} from './pages/page-test/page-test.component';
import {PageFeedComponent} from './pages/page-feed/page-feed.component';

export const routes: Routes = [
  {path: "test", component: PageTestComponent},
  {path: "", component: PageFeedComponent}
];
