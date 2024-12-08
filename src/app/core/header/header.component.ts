import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { User } from '../../types/user';

import { UserService } from '../../user/user.service';
import { ErrorMsgComponent } from '../error-msg/error-msg.component';
import { ErrorMsgService } from '../error-msg/error-msg.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, ErrorMsgComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  hasError: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private errorMsgService: ErrorMsgService
  ) {
    this.errorMsgService.apiError$.subscribe((err) => {
      this.hasError = !!err;
    });
  }

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  get name(): string {
    return this.userService.user?.username || '';
  }

  logout() {
    if (!this.userService.isLogged) {
      return alert('You are not logged!');
    }

    this.userService.logout().subscribe({
      next: () => {
        this.hasError = false;
        this.router.navigate(['/home']);
      },
      error: () => {
        this.hasError = true;
      },
    });
  }
}
