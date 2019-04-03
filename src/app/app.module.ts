import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginPageComponent} from './loginPage/loginPage.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FooterComponent} from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    FooterComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
