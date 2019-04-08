import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './loginPage/loginPage.component';
import { MainPageComponent} from "./main-page/main-page.component";
import {LaunchPageComponent} from "./launch-page/launch-page.component";
import {StatPageComponent} from "./stat-page/stat-page.component";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'dashboard', component: MainPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'dashboard', component: MainPageComponent },
  { path: 'launch/:id', component: LaunchPageComponent },
  { path: 'stats/:id', component: StatPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
