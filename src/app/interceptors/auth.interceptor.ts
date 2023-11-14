import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {catchError, throwError} from "rxjs";
import {Router} from "@angular/router";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();

  const cloneRequest = req.clone({
    headers: req.headers.set('Authorization', ['Bearer', token].join(' '))
  });

  return next(cloneRequest).pipe(catchError((error: HttpErrorResponse) => {
    if (error.status === 401) {
      authService.logOut();
      void router.navigate(['']);
    }

    return throwError(() => error);
  }));
};
