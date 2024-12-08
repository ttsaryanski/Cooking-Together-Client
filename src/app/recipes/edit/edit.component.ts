import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm, NgModel } from '@angular/forms';

import { Recipe } from '../../types/recipe';

import {
  setButtonAttributes,
  setImgErrorClass,
  setNameErrorClass,
} from '../../utils/setClasses';
import { ImageUrlDirective } from '../../directives/image-url.directive';

import { RecipesService } from '../recipes.service';
import { ErrorMsgService } from '../../core/error-msg/error-msg.service';

import { LoaderComponent } from '../../shared/loader/loader.component';
import { ErrorMsgComponent } from '../../core/error-msg/error-msg.component';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule, ImageUrlDirective, ErrorMsgComponent, LoaderComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent implements OnInit {
  recipe: Recipe | null = null;
  hasError: boolean = false;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService,
    private errorMsgService: ErrorMsgService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['recipeId'];

    this.recipesService.getRecipeById(id).subscribe((recipe) => {
      this.recipe = recipe;
      this.isLoading = false;
    });
  }

  editRecipe(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const id = this.recipe!._id;
    this.recipesService.editRecipe(id, form.value).subscribe({
      next: () => {
        this.hasError = false;
        this.errorMsgService.clearError();
        this.router.navigate([`${id}/details`]);
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
