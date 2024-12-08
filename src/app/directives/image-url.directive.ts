import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[appImageUrl]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ImageUrlDirective,
      multi: true,
    },
  ],
})
export class ImageUrlDirective implements Validator {
  private imageUrlRegex = /^https?:\/\//;

  constructor() {}

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value || this.imageUrlRegex.test(value)) {
      return null;
    }

    return { imageUrlValidator: true };
  }
}
