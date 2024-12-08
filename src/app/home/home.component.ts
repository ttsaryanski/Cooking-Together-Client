import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Recipe } from '../types/recipe';

import { RecipesService } from '../recipes/recipes.service';
import { ErrorMsgService } from '../core/error-msg/error-msg.service';

import { LoaderComponent } from '../shared/loader/loader.component';
import { RecipeComponent } from '../recipes/recipe/recipe.component';
import { ErrorMsgComponent } from '../core/error-msg/error-msg.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, LoaderComponent, RecipeComponent, ErrorMsgComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  recipes: Recipe[] = [];
  isLoading: boolean = true;
  hasError: boolean = false;

  constructor(
    private recipeService: RecipesService,
    private errorMsgService: ErrorMsgService
  ) {
    this.errorMsgService.apiError$.subscribe((err) => {
      this.hasError = !!err;
    });
  }

  ngOnInit(): void {
    this.recipeService.getTopThreeRecipe().subscribe({
      next: (recipes) => {
        this.hasError = false;
        this.errorMsgService.clearError();
        this.recipes = recipes;
        this.isLoading = false;
      },
      error: () => {
        this.hasError = true;
        this.isLoading = false;
      },
    });
  }
}
