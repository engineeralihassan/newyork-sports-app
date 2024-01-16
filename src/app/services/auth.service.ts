import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl='http://139.59.35.241:3270'
      // token=localStorage.getItem('nasaTocken');
      //  headers = new HttpHeaders({
      //   'Content-Type': 'application/json',
      //   'Authorization': `Bearer ${this.token}` 
      // });
  constructor(private http:HttpClient) { }
  findUser(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/findUser`, data);
  }
  isLoggedin=false;
  logIn(val:boolean){
    return this.http.post<any>(`${this.apiUrl}/login`, val);
  }
  getGames(): Observable<any> {
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJyaWFuZ29lcmtlQHlhaG9vLmNvbSIsInVzZXJJZCI6MjA5NzU4NCwiaWQiOjY1ODUsImlhdCI6MTcwNTM5NzEyNCwiZXhwIjoxNzA1NDgzNTI0fQ.JIob7J3NHQ9OvMIFgvPSpecUzdACYH01EExlABF1QBU';
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      // Define your request body
      let token=localStorage.getItem('nasaTocken');
     let  headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${token}` 
     });
      const requestBody = { programState: '' };

      // Make the HTTP request with the specified headers and body
      return this.http.post(`${this.apiUrl}/getGames`, requestBody, {headers} );
   
  }
}
