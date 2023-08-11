import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
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

  public verifyOtp(val: any): Observable<any> {
    return this.http.post(this.apiUrl + 'user/otp/verify', val);
  }

  public resendOtp(val: any): Observable<any> {
    return this.http.post(this.apiUrl + 'user/otp/resend', val);
  }

  public dicardCreateUser(val: any): Observable<any> {
    return this.http.post(this.apiUrl + 'user/discard', val);
  }

  public loginUser(val: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.apiUrl + 'login', val);
  }

  public updateUser(val: any, token: any): Observable<any> {
    const headers = new HttpHeaders().set('x-auth-token', token);
    return this.http.put(this.apiUrl + 'user/update', val, { headers });
  }

  public updateUserProfilePic(val: any, token: any): Observable<any> {
    const headers = new HttpHeaders().set('x-auth-token', token);
    return this.http.put(this.apiUrl + 'user/profile/pic/update', val, {
      headers,
    });
  }

  public deleteUserProfilePic(token: any): Observable<any> {
    const headers = new HttpHeaders().set('x-auth-token', token);
    return this.http.delete(this.apiUrl + 'user/profile/pic/delete', {
      headers,
      responseType: 'blob',
    });
  }

  public deleteUser(): Observable<any> {
    return this.http.delete(this.apiUrl + 'user/delete');
  }

  public getUserById(token: any): Observable<any> {
    const headers = new HttpHeaders().set('x-auth-token', token);
    return this.http.get(this.apiUrl + 'user/me', { headers });
  }

  public getProfilePic(token: any): Observable<any> {
    const headers = new HttpHeaders().set('x-auth-token', token);
    return this.http.get(this.apiUrl + 'user/me/pic', {
      headers,
      responseType: 'blob',
    });
  }
}
