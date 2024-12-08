import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm, NgModel } from '@angular/forms';

import {
  setButtonAttributes,
  setImgErrorClass,
  setNameErrorClass,
} from '../../utils/setClasses';
import { ImageUrlDirective } from '../../directives/image-url.directive';

import { RecipesService } from '../recipes.service';
import { ErrorMsgService } from '../../core/error-msg/error-msg.service';

import { ErrorMsgComponent } from '../../core/error-msg/error-msg.component';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule, ImageUrlDirective, ErrorMsgComponent],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent {
  hasError: boolean = false;

  constructor(
    private recipesService: RecipesService,
    private router: Router,
    private errorMsgService: ErrorMsgService
  ) {
    this.errorMsgService.apiError$.subscribe((err) => {
      this.hasError = !!err;
    });
  }

  create(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const { title, description, ingredients, instructions, imageUrl } =
      form.value;

    this.recipesService
      .createRecipe(title, description, ingredients, instructions, imageUrl)
      .subscribe({
        next: () => {
          this.hasError = false;
          this.errorMsgService.clearError();
          this.router.navigate(['/catalog']);
          form.reset();
        },
        error: () => {
          this.hasError = true;
        },
      });
  }

  setClass(form: NgModel | null) {
    return setNameErrorClass(form);
  }

  setImgClass(form: NgModel | null) {
    return setImgErrorClass(form);
  }

  setButton(form: NgForm | null): {
    disabled: boolean;
    style: { [key: string]: string };
  } {
    return setButtonAttributes(form);
  }
}
