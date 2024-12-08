import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

import { Recipe } from '../types/recipe';
import { UserForAuth } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private user$$ = new BehaviorSubject<UserForAuth | null>(null);
  private user$ = this.user$$.asObservable();

  private likeUpdated$$ = new BehaviorSubject<boolean>(false);
  public likeUpdated$ = this.likeUpdated$$.asObservable();

  user: UserForAuth | null = null;

  constructor(private http: HttpClient) {
    this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  getRecipe(limit?: number, query?: string) {
    let url = `/api/item`;
    const params: string[] = [];

    if (limit) {
      params.push(`limit=${limit}`);
    }

    if (query) {
      params.push(`search=${encodeURIComponent(query)}`);
    }

    if (params.length > 0) {
      url += `?${params.join('&')}`;
    }

    return this.http.get<Recipe[]>(url);
  }

  createRecipe(
    title: string,
    description: string,
    ingredients: string,
    instructions: string,
    imageUrl: string
  ) {
    const payload = { title, description, ingredients, instructions, imageUrl };

    return this.http.post<Recipe>(`/api/item`, payload);
  }

  getRecipeById(id: string) {
    return this.http.get<Recipe>(`/api/item/${id}`);
  }

  editRecipe(id: string, data: Partial<Recipe>) {
    return this.http.put<Recipe>(`/api/item/${id}`, data);
  }

  removeRecipe(id: string) {
    return this.http.delete(`/api/item/${id}`);
  }

  likeRecipe(recipeId: string, userId: string) {
    return this.http
      .post(`/api/item/${recipeId}/like`, { params: { userId } })
      .pipe(
        tap(() => {
          this.likeUpdated$$.next(true);
        })
      );
  }

  getTopThreeRecipe() {
    return this.http.get<Recipe[]>('/api/item/top-three');
  }

  getProfileRecipe(page: number, limit: number) {
    return this.http.get<{
      items: Recipe[];
      totalCount: number;
      totalPages: number;
    }>('/api/item/profileItem', { params: { page, limit } });
  }

  getProfileLikedRecipe(page: number, limit: number) {
    return this.http.get<{
      items: Recipe[];
      totalCount: number;
      totalPages: number;
    }>('/api/item/profileLiked', { params: { page, limit } });
  }

  getAllToPaginated(page: number, limit: number) {
    return this.http.get<{
      items: Recipe[];
      totalCount: number;
      totalPages: number;
    }>('/api/item/paginated', { params: { page, limit } });
  }
}
