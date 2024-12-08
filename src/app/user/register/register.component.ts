import { Component } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import {
  setButtonAttributes,
  setEmailErrorClass,
  setNameErrorClass,
  setRePassErrorClass,
} from '../../utils/setClasses';
import { EmailDirective } from '../../directives/email.directive';
import { MatchPasswordDirective } from '../../directives/match-password.directive';

import { UserService } from '../user.service';
import { ErrorMsgService } from '../../core/error-msg/error-msg.service';

import { ErrorMsgComponent } from '../../core/error-msg/error-msg.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    EmailDirective,
    MatchPasswordDirective,
    ErrorMsgComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
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

  register(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const { username, email, password, rePassword } = form.value;

    this.userService
      .register(username!, email!, password!, rePassword!)
      .subscribe({
        next: () => {
          this.hasError = false;
          this.errorMsgService.clearError();
          this.router.navigate(['/home']);
          form.reset();
        },
        error: () => {
          this.hasError = true;
        },
      });
  }

  setNameClass(form: NgModel | null) {
    return setNameErrorClass(form);
  }

  setEmailClass(form: NgModel | null) {
    return setEmailErrorClass(form);
  }

  setPasswordClass(form: NgModel | null) {
    return setNameErrorClass(form);
  }

  setRePassClass(form: NgModel | null) {
    return setRePassErrorClass(form);
  }

  setButton(form: NgForm | null): {
    disabled: boolean;
    style: { [key: string]: string };
  } {
    return setButtonAttributes(form);
  }
}
