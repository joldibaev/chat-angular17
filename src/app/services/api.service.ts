import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly prefix = 'api';

  constructor(private httpClient: HttpClient) {
  }

  protected get<T>(url: string) {
    return this.httpClient.get<T>(this.prefix + url);
  }

  protected post<T>(url: string, data: object) {
    return this.httpClient.post<T>(this.prefix + url, data);
  }
}
