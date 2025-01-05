import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs';

import { environment } from '../../environments/environment.development';

import { ErrorMsgService } from '../core/error-msg/error-msg.service';

const { apiUrl } = environment;
const API = '/api';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith(API)) {
    req = req.clone({
      url: req.url.replace(API, apiUrl),
      withCredentials: true,
    });
  }

  const errorMsgService = inject(ErrorMsgService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((err) => {
      if (err.status === 401 && err.error?.message === 'Invalid token!') {
        //router.navigate(['/home']);
      } else if (
        err.status === 404 &&
        err.error?.message === 'There is no item with this id.'
      ) {
        errorMsgService.setError(err);
        router.navigate(['/404']);
      } else {
        errorMsgService.setError(err);
        // router.navigate(['/error']);
      }

      throw err;
    })
  );
};
