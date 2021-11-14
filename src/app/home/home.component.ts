import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginService } from '../login/login.service';
import { UserService, User } from '../user/user.service';

@Component({
  selector: 'ipfgp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currentUser$: Observable<User> | null = null;
  error!: Object;

  constructor(private router: Router, private userService: UserService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.currentUser$ = this.userService.getCurrentUser()
      .pipe(
        catchError((err) => {
          this.loginService.logOut();
          this.userService.logOut();
          this.error = err;
          // this.router.navigate(['/login']);
          return throwError(err);
        })
      );
  }

}
