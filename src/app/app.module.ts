
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginPageComponent} from './loginPage/loginPage.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FooterComponent} from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { MainPageComponent } from './main-page/main-page.component';
import { QuestHeaderComponent } from './main-page/quest-header/quest-header.component';
import { QuestListComponent } from './main-page/quest-list/quest-list.component';
import { QuestionListComponent } from './main-page/question-list/question-list.component';
import { QuestionComponent } from './main-page/question/question.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    FooterComponent
    HeaderComponent,
    MainPageComponent,
    QuestHeaderComponent,
    QuestListComponent,
    QuestionListComponent,
    QuestionComponent

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
    QuestionComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
