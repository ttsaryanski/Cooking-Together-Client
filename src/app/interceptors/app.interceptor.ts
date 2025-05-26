import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { HttpInterceptorFn } from "@angular/common/http";
import { catchError, from, switchMap, throwError } from "rxjs";

import { environment } from "../../environments/environment";

import { ErrorMsgService } from "../core/error-msg/error-msg.service";
import { CsrfTokenService } from "./csrf-token.service";

const { apiUrl } = environment;
const API = "/api";

export const appInterceptor: HttpInterceptorFn = (req, next) => {
    const errorMsgService = inject(ErrorMsgService);
    const router = inject(Router);
    const csrfTokenService = inject(CsrfTokenService);

    let clonedReq = req;

    if (req.url.startsWith(API)) {
        clonedReq = req.clone({
            url: req.url.replace(API, apiUrl),
            withCredentials: true,
        });
    }

    const needsCsrf = ["POST", "PUT", "PATCH", "DELETE"].includes(
        req.method.toUpperCase()
    );

    if (needsCsrf) {
        return from(csrfTokenService.getToken()).pipe(
            switchMap((token) => {
                const withCsrf = clonedReq.clone({
                    headers: clonedReq.headers.set("X-CSRF-Token", token),
                });

                return next(withCsrf);
            }),
            catchError(handleError)
        );
    }

    return next(clonedReq).pipe(catchError(handleError));

    function handleError(err: any) {
        if (err.status === 401 && err.error?.message === "Invalid token!") {
            // router.navigate(['/home']);
        } else if (
            err.status === 404 &&
            err.error?.message === "There is no item with this id."
        ) {
            errorMsgService.setError(err);
            router.navigate(["/404"]);
        } else {
            errorMsgService.setError(err);
            // router.navigate(['/error']);
        }

        return throwError(() => err);
    }
};
