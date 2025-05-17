import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, tap } from "rxjs";

import { Recipe } from "../types/recipe";
import { UserForAuth } from "../types/user";

@Injectable({
    providedIn: "root",
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
        let url = `/api/recipes`;
        const params: string[] = [];

        if (limit) {
            params.push(`limit=${limit}`);
        }

        if (query) {
            params.push(`search=${encodeURIComponent(query)}`);
        }

        if (params.length > 0) {
            url += `?${params.join("&")}`;
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
        const payload = {
            title,
            description,
            ingredients,
            instructions,
            imageUrl,
        };

        return this.http.post<Recipe>(`/api/recipes`, payload);
    }

    getRecipeById(id: string) {
        return this.http.get<Recipe>(`/api/recipes/${id}`);
    }

    editRecipe(id: string, data: Partial<Recipe>) {
        return this.http.put<Recipe>(`/api/recipes/${id}`, data);
    }

    removeRecipe(id: string) {
        return this.http.delete(`/api/recipes/${id}`);
    }

    likeRecipe(recipeId: string) {
        return this.http.post(`/api/recipes/${recipeId}/like`, {}).pipe(
            tap(() => {
                this.likeUpdated$$.next(true);
            })
        );
    }

    getTopThreeRecipe() {
        return this.http.get<Recipe[]>("/api/recipes/top-three");
    }

    getProfileRecipe(page: number, limit: number) {
        return this.http.get<{
            items: Recipe[];
            totalCount: number;
            totalPages: number;
        }>("/api/recipes/profileItem", { params: { page, limit } });
    }

    getProfileLikedRecipe(page: number, limit: number) {
        return this.http.get<{
            items: Recipe[];
            totalCount: number;
            totalPages: number;
        }>("/api/recipes/profileLiked", { params: { page, limit } });
    }

    getAllToPaginated(page: number, limit: number) {
        return this.http.get<{
            items: Recipe[];
            totalCount: number;
            totalPages: number;
        }>("/api/recipes/paginated", { params: { page, limit } });
    }
}
