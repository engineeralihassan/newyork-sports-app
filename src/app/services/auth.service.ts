import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl=environment.apiUrl;
  otpCode:any;
  user:any;
  loginMethod='username';
 
  constructor(private http:HttpClient) { }
  findUser(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/findUser`, data);
  }
  isLoggedin=false;
  logIn(val:boolean){
    return this.http.post<any>(`${this.apiUrl}/login`, val);
  }
  getGames(): Observable<any> {
      let token=localStorage.getItem('nasaTocken');
     let  headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${token}` 
     });
      const requestBody = { programState: '' };
      return this.http.post(`${this.apiUrl}/getGames`, requestBody, {headers} );
   
  }
  verifyOtp(data:any): Observable<any> {

    return this.http.post(`${this.apiUrl}/otpVerify`, data, );
 
}
setLoginMethod(method:any){
  this.loginMethod=method;
}

resetPassword(data:any): Observable<any> {
  return this.http.post(`${this.apiUrl}/addPassword`, data, );
}
}
