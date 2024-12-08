import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[appEmail]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: EmailDirective,
    },
  ],
})
export class EmailDirective implements Validator {
  private emailRegex = /^[A-Za-z0-9._%+-]{3,}@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  constructor() {}

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value || this.emailRegex.test(value)) {
      return null;
    }

    return { emailValidator: true };
  }
}
