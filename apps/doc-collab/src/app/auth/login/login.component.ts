import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Credentials } from '@doccollab/api-interfaces';
import { AuthService } from './../auth.service';

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
  ) { }

  ngOnInit(): void {
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

}
