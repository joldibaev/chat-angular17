import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from "rxjs";
import {inject} from "@angular/core";
import {NotyfService} from "../services/notyf.service";

export const errorNotyfInterceptor: HttpInterceptorFn = (req, next) => {
  const notyfService = inject(NotyfService);

  return next(req).pipe(catchError((error: HttpErrorResponse) => {
    const {message} = error.error;
    notyfService.error(message ?? error.statusText);

    return throwError(() => error);
  }));
};
