import {Injectable} from '@angular/core';
import {Notyf} from "notyf";

@Injectable({
  providedIn: 'root'
})
export class NotyfService {
  readonly notyf = new Notyf({
    dismissible: true,
  });

  error(message: string) {
    return this.notyf.error(message);
  }

  success(message: string) {
    return this.notyf.success(message);
  }
}
