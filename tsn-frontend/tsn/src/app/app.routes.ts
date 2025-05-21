import { Routes } from '@angular/router';
import {PageTestComponent} from './pages/page-test/page-test.component';
import {PageFeedComponent} from './pages/page-feed/page-feed.component';
import {PageLoginComponent} from './pages/page-login/page-login.component';
import {AuthGuard} from './guards/auth.guard';
import {PageMessagesComponent} from './pages/page-messages/page-messages.component';
import {PageProfilComponent} from './pages/page-profil/page-profil.component';
import {PageRechercheComponent} from './pages/page-recherche/page-recherche.component';
import {PageReglagesComponent} from './pages/page-reglages/page-reglages.component';
import {PageAmisComponent} from './pages/page-amis/page-amis.component';

export const routes: Routes = [
  {path: "", component: PageFeedComponent, canActivate: [AuthGuard]},
  {path: "test", component: PageTestComponent, canActivate: [AuthGuard]},
  {path: "login", component: PageLoginComponent},
  {path: "messages", component: PageMessagesComponent, canActivate: [AuthGuard]},
  {path: "profil/:username", component: PageProfilComponent, canActivate: [AuthGuard]},
  {path: "profil", component: PageProfilComponent, canActivate: [AuthGuard]},
  {path: "recherche", component: PageRechercheComponent, canActivate: [AuthGuard]},
  {path: "recherche/:search", component: PageRechercheComponent, canActivate: [AuthGuard]},
  {path: "reglages", component: PageReglagesComponent, canActivate: [AuthGuard]},
  {path: "amis/:username", component: PageAmisComponent, canActivate: [AuthGuard]},
  {path: "amis", component: PageAmisComponent, canActivate: [AuthGuard]}
];
