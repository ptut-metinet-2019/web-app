import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { RestService} from "../rest.service";

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginPageComponent implements OnInit {
  public registerMessageError = "";
  public confirmPasswordError = false;
  public invalidCredentialsError = false;
  public token: any;
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

  constructor(private router: Router, private restService: RestService) {
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
      console.info("LOGIN RESULT = ",result);
      if(result.status === 401){
        //BAD LOGIN OR PASSWORD
        this.invalidCredentialsError = true;
        this.confirmPasswordError = false;
      }else if(result.token != undefined){
        this.token = result.token;
        this.router.navigate(['/', 'dashboard']);
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
      console.info("REGISTER RESULT = ",result);
      if(result != undefined && result.token != undefined){
        this.token = result.token;
        this.router.navigate(['/', 'dashboard']);
      }
      else{
        this.registerMessageError = result.error.error;
        return false;
      }
    });
  }
}

