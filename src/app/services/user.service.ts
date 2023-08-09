import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public createUser(val: any): Observable<any> {
    return this.http.post(this.apiUrl + 'user/create', val);
  }
}
