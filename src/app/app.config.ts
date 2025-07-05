import {
    ApplicationConfig,
    provideZoneChangeDetection,
    isDevMode,
} from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { appInterceptor } from "./interceptors/app.interceptor";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { provideServiceWorker } from "@angular/service-worker";

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(withInterceptors([appInterceptor])),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideServiceWorker("ngsw-worker.js", {
            enabled: !isDevMode(),
            registrationStrategy: "registerWhenStable:30000",
        }),
    ],
};
