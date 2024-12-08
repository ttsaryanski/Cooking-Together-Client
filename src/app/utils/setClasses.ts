import { NgModel, NgForm } from '@angular/forms';

export function setNameErrorClass(name: NgModel | null): string {
  if (name?.touched && name?.errors?.['required']) {
    return 'border-error';
  }
  if (name?.touched && name?.errors?.['minlength']) {
    return 'border-error';
  }
  return '';
}

export function setEmailErrorClass(email: NgModel | null): string {
  if (email?.touched && email?.errors?.['required']) {
    return 'border-error';
  }
  if (email?.touched && email?.errors?.['emailValidator']) {
    return 'border-error';
  }
  return '';
}

export function setImgErrorClass(email: NgModel | null): string {
  if (email?.touched && email?.errors?.['required']) {
    return 'border-error';
  }
  if (email?.touched && email?.errors?.['imageUrlValidator']) {
    return 'border-error';
  }
  return '';
}

export function setRePassErrorClass(rePass: NgModel | null): string {
  if (rePass?.touched && rePass?.errors?.['required']) {
    return 'border-error';
  }
  if (rePass?.touched && rePass?.errors?.['matchPassword']) {
    return 'border-error';
  }
  return '';
}

export function setButtonAttributes(form: NgForm | null): {
  disabled: boolean;
  style: { [key: string]: string };
} {
  const isDisabled = form?.invalid || false; // Проверяваме дали формата е валидна
  const buttonStyle = {
    backgroundColor: isDisabled ? 'grey' : '',
  };

  return { disabled: isDisabled, style: buttonStyle };
}
