import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService, RegistrationUser } from '../user/user.service';
import { Router } from '@angular/router';
import { LoginCredentials, LoginService } from '../login/login.service';
import { Subscription } from 'rxjs';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'ipfgp-registration-user',
  templateUrl: './registration-user.component.html',
  styleUrls: ['./registration-user.component.scss']
})
export class RegistrationUserComponent implements OnInit, OnDestroy {

  registrationUserError = false;
  registrationUserSubscription: Subscription | null = null;

  registrationUserForm = this.fb.group({
    username: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
    password: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
    givenName: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
    familyName: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]]
  });

  constructor(private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private loginService: LoginService) { }

  ngOnInit(): void {
    if (this.loginService.getJwtToken()) {
      this.router.navigate(['']);
    }
  }

  register(): void {
    const registrationUser: RegistrationUser = new RegistrationUser(
      this.registrationUserForm.get('username')!.value,
      this.registrationUserForm.get('password')!.value,
      this.registrationUserForm.get('givenName')!.value,
      this.registrationUserForm.get('familyName')!.value
    );
    this.registrationUserSubscription = this.userService
      .registerUser(registrationUser)
      .pipe(concatMap(() =>
        this.loginService.logIn(
          new LoginCredentials(registrationUser.username, registrationUser.password)
          )
      )).subscribe(
        () => {
          this.registrationUserError = false;
          this.router.navigate(['']);
        },
        () => this.registrationUserError = true
      );
  }

  get username() { return this.registrationUserForm.get('username'); }

  get password() { return this.registrationUserForm.get('password'); }

  get givenName() { return this.registrationUserForm.get('givenName'); }

  get familyName() { return this.registrationUserForm.get('familyName'); }

  ngOnDestroy() {
    if (this.registrationUserSubscription != null) this.registrationUserSubscription.unsubscribe();
  }

}
