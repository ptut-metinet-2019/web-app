import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginPageComponent} from './loginPage/loginPage.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FooterComponent} from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

import { MainPageComponent } from './main-page/main-page.component';
import { QuestHeaderComponent } from './main-page/quest-header/quest-header.component';
import { QuestListComponent } from './main-page/quest-list/quest-list.component';
import { QuestionListComponent } from './main-page/question-list/question-list.component';
import { QuestionComponent } from './main-page/question/question.component';

import { LaunchPageComponent} from "./launch-page/launch-page.component";
import { QuestionListLaunchComponent} from "./launch-page/question-list/question-list-launch.component";
import { QuestionLaunchComponent} from "./launch-page/question/question-launch.component";
import { QuestHeaderLaunchComponent} from "./launch-page/quest-header/quest-header-launch.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    FooterComponent,
    HeaderComponent,
    MainPageComponent,
    QuestHeaderComponent,
    QuestListComponent,
    QuestionListComponent,
    QuestionComponent,
    LaunchPageComponent,
    QuestionListLaunchComponent,
    QuestionLaunchComponent,
    QuestHeaderLaunchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    FooterComponent,
    MainPageComponent,
    HeaderComponent,
    QuestHeaderComponent,
    QuestListComponent,
    QuestionListComponent,
    QuestionComponent,
    LaunchPageComponent,
    QuestionListLaunchComponent,
    QuestionLaunchComponent,
    QuestHeaderLaunchComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
