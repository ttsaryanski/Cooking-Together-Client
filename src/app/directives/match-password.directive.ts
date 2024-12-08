import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appMatchPassword]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MatchPasswordDirective,
      multi: true,
    },
  ],
})
export class MatchPasswordDirective implements Validator {
  constructor() {}
  @Input('appMatchPassword') passwordField!: string;
  private subscription: Subscription | null = null;

  validate(control: AbstractControl): ValidationErrors | null {
    if (!control || !control.parent) {
      return null;
    }

    const password = control.parent.get(this.passwordField);
    const repeatPassword = control;

    if (!password || !repeatPassword) {
      return null;
    }

    if (!this.subscription) {
      this.subscription = password.valueChanges?.subscribe(() => {
        repeatPassword.updateValueAndValidity();
      });
    }

    if (repeatPassword.value !== password.value) {
      return { matchPassword: true };
    }

    return null;
  }
}
