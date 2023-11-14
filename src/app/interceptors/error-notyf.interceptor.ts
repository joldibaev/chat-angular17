import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from "rxjs";
import {inject, PLATFORM_ID} from "@angular/core";
import {NotyfService} from "../services/notyf.service";
import {isPlatformBrowser} from "@angular/common";

export const errorNotyfInterceptor: HttpInterceptorFn = (req, next) => {
  const notyfService = inject(NotyfService);
  const platformId = inject(PLATFORM_ID);

  return next(req).pipe(catchError((error: HttpErrorResponse) => {
    if (isPlatformBrowser(platformId)) {
      const {message} = error.error;
      notyfService.error(message ?? error.statusText);
    }

    return throwError(() => error);
  }));
};
