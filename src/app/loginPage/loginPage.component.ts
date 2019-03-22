import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginPageComponent implements OnInit {

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

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  onRegisterSubmit() {
    if (this.registerForm.getRawValue().registerPassword === encodeURIComponent(this.registerForm.getRawValue().registerConfirmPassword)) {
      this.confirmPasswordError = false;
    } else {
      // pass doesnt matchs
      this.confirmPasswordError = true;
    }
  }

  onLoginSubmit() {
    if (this.verifyCredentials() === true) {
      this.router.navigate(['/', 'dashboard']);
    } else {
      this.invalidCredentialsError = true;
    }
  }

  verifyCredentials() {

    if (this.loginForm.getRawValue().loginEmail === 'philippe.gambier@hotmail.fr' &&
      this.loginForm.getRawValue().loginPassword === 'totototo') {
      return true;
    }
    return false;
  }

}

