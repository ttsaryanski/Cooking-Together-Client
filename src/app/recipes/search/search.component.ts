import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { Recipe } from '../../types/recipe';

import { RecipesService } from '../recipes.service';
import { ErrorMsgService } from '../../core/error-msg/error-msg.service';

import { LoaderComponent } from '../../shared/loader/loader.component';
import { RecipeComponent } from '../recipe/recipe.component';
import { ErrorMsgComponent } from '../../core/error-msg/error-msg.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [LoaderComponent, RecipeComponent, FormsModule, ErrorMsgComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  recipes: Recipe[] = [];
  isLoading: boolean = true;
  hasError: boolean = false;
  query: string = '';

  currentPage: number = 1;
  pageSize: number = 9;
  totalRecipes: number = 0;
  totalPages: number = 0;

  constructor(
    private recipeService: RecipesService,
    private errorMsgService: ErrorMsgService
  ) {
    this.errorMsgService.apiError$.subscribe((err) => {
      this.hasError = !!err;
    });
  }

  ngOnInit(): void {
    this.loadRecipes();
  }

  search(form: NgForm) {
    this.query = form.value.query;
    this.recipeService.getRecipe(undefined, this.query).subscribe((recipes) => {
      this.recipes = recipes;
      this.isLoading = false;
      this.totalRecipes = recipes.length;
      this.totalPages = Math.ceil(this.totalRecipes / this.pageSize);
    });
  }

  loadRecipes(): void {
    this.isLoading = true;
    this.recipeService
      .getAllToPaginated(this.currentPage, this.pageSize)
      .subscribe({
        next: (recipes) => {
          this.hasError = false;
          this.errorMsgService.clearError();
          this.recipes = recipes.items;
          this.totalRecipes = recipes.totalCount;
          this.totalPages = recipes.totalPages;
          this.isLoading = false;
        },
        error: () => {
          this.hasError = true;
          this.isLoading = false;
        },
      });
  }

  nextPage(): void {
    if (this.currentPage < Math.ceil(this.totalRecipes / this.pageSize)) {
      this.currentPage++;
      this.loadRecipes();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadRecipes();
    }
  }
}
