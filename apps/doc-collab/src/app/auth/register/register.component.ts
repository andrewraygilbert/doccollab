import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CreateUserDTO } from '@doccollab/api-interfaces';

@Component({
  selector: 'doccollab-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public activeError: boolean = false;
  public errorMsg = '';

  public registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  public onRegister() {
    const dto = this.buildDto();
    this.authService.register(dto)
      .then(response => {
        console.log(response);
        this.resetForm();
        this.router.navigateByUrl('login');
      })
      .catch(err => this.showError(err));
  }

  private buildDto(): CreateUserDTO {
    return {
      firstName: this.registerForm.get('firstName')!.value,
      lastName: this.registerForm.get('lastName')!.value,
      username: this.registerForm.get('username')!.value,
      password: this.registerForm.get('password')!.value,
      ownDocs: [],
      collabDocs: [],
      viewDocs: []
    };
  }

  private resetForm() {
    this.registerForm.get('firstName')?.setValue('');
    this.registerForm.get('lastName')?.setValue('');
    this.registerForm.get('username')?.setValue('');
    this.registerForm.get('password')?.setValue('');
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
