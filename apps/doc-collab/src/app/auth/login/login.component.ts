import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Credentials } from '@doccollab/api-interfaces';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'doccollab-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  public activeError: boolean = false;
  public errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.verifyLoggedIn();
  }

  public onSubmitLogin() {
    const credentials: Credentials = {
      username: this.loginForm.get('username')!.value,
      password: this.loginForm.get('password')!.value
    };
    this.authService.login(credentials)
      .then(response => {
        console.log(response);
        this.authService.saveToken(response);
        this.router.navigateByUrl('/dashboard');
      })
      .catch(err => {
        console.log(err);
        this.showError(err.error.message);
      });
  }

  private showError(errorMsg: string) {
    this.errorMsg = errorMsg;
    this.activeError = true;
    const errorTimer = setTimeout(() => {
      this.activeError = false;
      this.errorMsg = '';
    }, 5000);
  }

  private verifyLoggedIn() {
    console.log('in logged in');
    const token = this.authService.getToken();
    if (!token) {
      this.router.navigateByUrl('login');
    } else {
      this.router.navigateByUrl('dashboard');
    }
  }

}
