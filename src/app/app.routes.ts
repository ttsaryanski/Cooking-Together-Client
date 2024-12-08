import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { CreateComponent } from './recipes/create/create.component';
import { Page404Component } from './page404/page404/page404.component';
import { CatalogComponent } from './recipes/catalog/catalog.component';
import { DetailsComponent } from './recipes/details/details/details.component';
import { EditComponent } from './recipes/edit/edit.component';
import { SearchComponent } from './recipes/search/search.component';
import { ProfileComponent } from './user/profile/profile.component';
import { isAuthenticated } from './guards/auth.guard';
import { logedGuard } from './guards/logged.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  { path: 'login', component: LoginComponent, canActivate: [logedGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [logedGuard] },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [isAuthenticated],
  },

  { path: 'catalog', component: CatalogComponent },
  {
    path: 'create',
    component: CreateComponent,
    canActivate: [isAuthenticated],
  },
  { path: 'search', component: SearchComponent },
  { path: ':recipeId/details', component: DetailsComponent },
  { path: ':recipeId/edit', component: EditComponent },

  { path: '404', component: Page404Component },
  { path: '**', redirectTo: '/404' },
];
