import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  loggedInUser: User;

sitename: string;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loggedInUser =  this.authService.getToken();
  }

}
