import { inject } from "@angular/core";
import { combineLatest, filter, map, Observable, take } from "rxjs";
import {
    ActivatedRouteSnapshot,
    CanActivateChildFn,
    Router,
    RouterStateSnapshot,
} from "@angular/router";

import { UserService } from "../user/user.service";

export const isAuthenticated: CanActivateChildFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const userService = inject(UserService);
    const router = inject(Router);

    return combineLatest([userService.isLoading$, userService.user$]).pipe(
        filter(([isLoading, _]) => !isLoading),
        take(1),
        map(([_, user]) => {
            if (user) {
                return true;
            } else {
                router.navigate(["/login"]);
                return false;
            }
        })
    );
};
