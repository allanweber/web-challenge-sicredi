import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../shared/services/login.service';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private loginSubscription: Subscription;

  public validation = null;
  public loginForm = this.formBuilder.group({
    email: [
      'mail@mail.com',
      Validators.compose([Validators.required, Validators.email]),
    ],
    password: ['123456', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
  ) {}

  ngOnInit() {}

  onSubmit() {
    const user: User = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value,
    };

    this.loginSubscription = this.loginService
      .validateAceess(user)
      .subscribe(response => {
        if (response) {
          this.validation = null;
          this.router.navigate(['/']);
        } else {
          this.validation = 'Email ou senha inválido';
        }
      });
  }

  get isInvalid() {
    return this.validation;
  }

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  showError(controlName: string) {
    return (
      this.loginForm.controls[controlName].dirty &&
      ( this.loginForm.controls[controlName].hasError('required') ||
      this.loginForm.controls[controlName].hasError('email'))
    );
  }
}
