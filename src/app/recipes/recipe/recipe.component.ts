import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Recipe } from '../../types/recipe';

import { SlicePipe } from '../../shared/pipes/slice.pipe';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [RouterLink, SlicePipe],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css',
})
export class RecipeComponent {
  @Input() recipe!: Recipe;
}
