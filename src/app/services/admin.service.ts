import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  loginAsAdmin = false;
  apiUrl = environment.apiUrl;
  constructor(private router: Router, private http: HttpClient) {}
  setLoginAsAdmin(login: any) {
    this.loginAsAdmin = login;
  }
  loginAdminProceed(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }
}
