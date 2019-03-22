import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainPageComponent } from './main-page/main-page.component';
import { QuestHeaderComponent } from './quest-header/quest-header.component';
import { QuestListComponent } from './quest-list/quest-list.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionComponent } from './question/question.component';

@NgModule({
  declarations: [
    AppComponent,
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
    FormsModule
  ],
  providers: [
    MainPageComponent,
    HeaderComponent,
    QuestHeaderComponent,
    QuestListComponent,
    QuestionListComponent,
    QuestionComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
