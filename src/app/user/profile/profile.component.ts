import { Component, OnInit } from '@angular/core';

import { Recipe } from '../../types/recipe';
import { ProfileDetails } from '../../types/user';

import { UserService } from '../user.service';
import { ErrorMsgService } from '../../core/error-msg/error-msg.service';

import { ErrorMsgComponent } from '../../core/error-msg/error-msg.component';
import { RecipesService } from '../../recipes/recipes.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { RecipeComponent } from '../../recipes/recipe/recipe.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ErrorMsgComponent, LoaderComponent, RecipeComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  isLoading: boolean = true;
  hasError: boolean = false;
  profileRecipes: Recipe[] = [];
  profileLikedRecipes: Recipe[] = [];
  profileDetails: ProfileDetails = {
    username: '',
    email: '',
  };

  currentPageOwner: number = 1;
  pageSizeOwner: number = 5;
  totalRecipesOwner: number = 0;
  totalPagesOwner: number = 0;

  currentPageLiked: number = 1;
  pageSizeLiked: number = 5;
  totalRecipesLiked: number = 0;
  totalPagesLiked: number = 0;

  constructor(
    private userService: UserService,
    private errorMsgService: ErrorMsgService,
    private recipesService: RecipesService
  ) {
    this.errorMsgService.apiError$.subscribe((err) => {
      this.hasError = !!err;
    });
  }

  ngOnInit(): void {
    this.userService.user$.subscribe({
      next: (user) => {
        if (user) {
          this.hasError = false;
          this.errorMsgService.clearError();
          const { _id, username, email, password } = user!;
          this.profileDetails = { username, email };

          this.userRecipes();
          this.likedRecipes();
        }
      },
      error: () => {
        this.hasError = true;
      },
    });
  }

  likedRecipes() {
    this.recipesService
      .getProfileLikedRecipe(this.currentPageLiked, this.pageSizeLiked)
      .subscribe({
        next: (recipes) => {
          this.hasError = false;
          this.errorMsgService.clearError();
          this.profileLikedRecipes = recipes.items;
          this.totalRecipesLiked = recipes.totalCount;
          this.totalPagesLiked = recipes.totalPages;
          this.isLoading = false;
        },
        error: () => {
          this.hasError = true;
          this.isLoading = false;
        },
      });
  }

  userRecipes(): void {
    this.recipesService
      .getProfileRecipe(this.currentPageOwner, this.pageSizeOwner)
      .subscribe({
        next: (recipes) => {
          this.hasError = false;
          this.errorMsgService.clearError();
          this.profileRecipes = recipes.items;
          this.totalRecipesOwner = recipes.totalCount;
          this.totalPagesOwner = recipes.totalPages;
          this.isLoading = false;
        },
        error: () => {
          this.hasError = true;
          this.isLoading = false;
        },
      });
  }

  nextPageOwner(): void {
    if (
      this.currentPageOwner <
      Math.ceil(this.totalRecipesOwner / this.pageSizeOwner)
    ) {
      this.currentPageOwner++;
      this.userRecipes();
    }
  }
  previousPageOwner(): void {
    if (this.currentPageOwner > 1) {
      this.currentPageOwner--;
      this.userRecipes();
    }
  }

  nextPageLiked(): void {
    if (
      this.currentPageLiked <
      Math.ceil(this.totalRecipesLiked / this.pageSizeLiked)
    ) {
      this.currentPageLiked++;
      this.userRecipes();
    }
  }
  previousPageLiked(): void {
    if (this.currentPageLiked > 1) {
      this.currentPageLiked--;
      this.userRecipes();
    }
  }
}
