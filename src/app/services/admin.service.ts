import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  loginAsAdmin = false;
  apiUrl = environment.admin;
  singleUser: any;
  adminUser: any;

  constructor(private router: Router, private http: HttpClient) {}
  setLoginAsAdmin(login: any) {
    this.loginAsAdmin = login;
  }
  loginAdminProceed(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }
  GetMatchesAsAdmin(data: any, parms: any) {
    let params = new HttpParams()
      .set('page', parms.page.toString())
      .set('limit', parms.limit.toString())
      .set('search', parms.search);
    let token = localStorage.getItem('nasaTocken');
    let headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(`${this.apiUrl}/getAllGames`, data, {
      params: params,
    });
  }
  getCheckins(data: any) {
    return this.http.post(`${this.apiUrl}/getCheckIns`, data);
  }
  getsingleUser(data: any) {
    return this.http.post(`${this.apiUrl}/getUserDetails`, data);
  }
  setAdmin(admin: any) {
    this.adminUser = admin;
  }
}
