import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private myRoute: Router
    ) {}

  sendToken(token: User) {
    localStorage.setItem("LoggedInUser", JSON.stringify(token))
  }

  getToken() {
    return JSON.parse(localStorage.getItem("LoggedInUser"));
  }

  isLoggedIn() {
    return this.getToken() != null;
  }

  logout() {
    localStorage.removeItem("LoggedInUser");
    this.myRoute.navigate(["login"]);
  }

}
