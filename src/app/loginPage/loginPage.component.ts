import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { RestService} from "../rest.service";

import {Connection} from '../connection/connection.service';
import {Request} from '../connection/request.model';
import {Response} from '../connection/response.model';
import {Questionnaire} from '../model/questionnaire.model';
import {QuestionnaireEventListener, QuestionnaireDeletedEvent, QuestionnaireCreatedEvent} from '../connection/event/questionnaire.model';
import {ConnectedEvent, DisconnectedEvent, ConnectionEventListener} from '../connection/event/connection.model';
import {WebSocket} from "../web-socket.service";

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginPageComponent implements OnInit {
  public registerMessageError = "";
  public confirmPasswordError = false;
  public invalidCredentialsError = false;
  loginForm = new FormGroup({
    loginEmail: new FormControl('', [
        Validators.required,
        Validators.email
      ]
    ),
    loginPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]
    )
  });
  registerForm = new FormGroup({
    registerEmail: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    registerPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    registerConfirmPassword: new FormControl('', [
      Validators.required,
    ])
  });

  constructor(private router: Router, private restService: RestService, private webSocket: WebSocket) {

  }

  ngOnInit(): void {

  }

  onRegisterSubmit() {
    this.register();
  }


  onLoginSubmit() {
    this.login();
  }

  public login() {
    let jsonObject = {
      email: this.loginForm.getRawValue().loginEmail,
      password: this.loginForm.getRawValue().loginPassword
    }
    this.restService.login(jsonObject).subscribe((result: any) => {
      if(result.status === 401){
        //BAD LOGIN OR PASSWORD
        this.invalidCredentialsError = true;
        this.confirmPasswordError = false;
      }else if(result.token != undefined){
        this.onLoginSuccess(result.token);
      }else{
        this.invalidCredentialsError = true;
        this.confirmPasswordError = false;
      }
    });
  }

  public register(){
    if(this.registerForm.getRawValue().registerPassword != this.registerForm.getRawValue().registerConfirmPassword){
      this.confirmPasswordError = true;
      this.invalidCredentialsError = false;
      return false;
    }
    let jsonObject = {
      email: this.registerForm.getRawValue().registerEmail,
      password: this.registerForm.getRawValue().registerPassword
    }
    this.restService.register(jsonObject).subscribe((result: any) => {
      if(result != undefined && result.token != undefined){
        this.onLoginSuccess(result.token);
      }
      else{
        this.registerMessageError = result.error.error;
        return false;
      }
    });
  }

  private onLoginSuccess(token: any){
    this.webSocket.initLoginConnexion(token);
  }
}

