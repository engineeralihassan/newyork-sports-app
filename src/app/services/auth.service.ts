import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  isLoggedin=false;
  logIn(val:boolean){
    this.isLoggedin=val;
  }
}
