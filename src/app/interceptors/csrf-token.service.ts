import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class CsrfTokenService {
    private token: string | null = null;

    constructor(private http: HttpClient) {}

    async getToken(): Promise<string> {
        if (this.token) return this.token;

        const data = await firstValueFrom(
            this.http.get<{ csrfToken: string }>("/api/csrf-token", {
                withCredentials: true,
            })
        );

        this.token = data?.csrfToken || "";
        return this.token;
    }
}
