import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, catchError, of, tap } from "rxjs";

import { UserForAuth } from "../types/user";

@Injectable({
    providedIn: "root",
})
export class UserService {
    private user$$ = new BehaviorSubject<UserForAuth | null>(null);
    public user$ = this.user$$.asObservable();

    private isLogged$$ = new BehaviorSubject<boolean>(false);
    isLogged$ = this.isLogged$$.asObservable();

    private isLoading$$ = new BehaviorSubject<boolean>(true);
    public isLoading$ = this.isLoading$$.asObservable();

    user: UserForAuth | null = null;

    get isLogged(): boolean {
        return !!this.user;
    }

    constructor(private http: HttpClient) {
        this.user$.subscribe((user) => {
            this.user = user;
        });
        this.isLogged$$ = new BehaviorSubject<boolean>(!!this.user$$.value);
    }

    login(email: string, password: string) {
        return this.http
            .post<UserForAuth>("/api/cooking/authAngular/login", {
                email,
                password,
            })
            .pipe(
                tap((user) => {
                    this.user$$.next(user);
                    this.isLogged$$.next(!!user);
                    this.isLoading$$.next(false);
                }),
                catchError((err) => {
                    this.user$$.next(null);
                    this.isLogged$$.next(false);
                    this.isLoading$$.next(false);
                    throw err;
                })
            );
    }

    register(
        username: string,
        email: string,
        password: string,
        rePassword: string,
        file: File | null
    ) {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("rePassword", rePassword);
        if (file) {
            formData.append("profilePicture", file);
        }
        return this.http
            .post<UserForAuth>("/api/cooking/authAngular/register", formData)
            .pipe(
                tap((user) => {
                    this.user$$.next(user);
                    this.isLogged$$.next(!!user);
                    this.isLoading$$.next(false);
                }),
                catchError((err) => {
                    this.user$$.next(null);
                    this.isLogged$$.next(false);
                    this.isLoading$$.next(false);
                    throw err;
                })
            );
    }

    logout() {
        return this.http.post("/api/cooking/authAngular/logout", {}).pipe(
            tap(() => {
                this.user$$.next(null);
                this.isLogged$$.next(false);
            }),
            catchError((err) => {
                this.isLoading$$.next(false);
                throw err;
            })
        );
    }

    getProfile() {
        return this.http
            .get<UserForAuth>("/api/cooking/authAngular/profile")
            .pipe(
                tap((user) => {
                    this.user$$.next(user);
                    this.isLogged$$.next(!!user);
                    this.isLoading$$.next(false);
                }),
                catchError((err) => {
                    this.user$$.next(null);
                    this.isLogged$$.next(false);
                    this.isLoading$$.next(false);
                    throw err;
                })
            );
    }
}
