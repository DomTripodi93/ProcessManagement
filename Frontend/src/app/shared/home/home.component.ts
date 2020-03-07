import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  day = new Date().getDay() + 1;
  month = new Date().getMonth() + 1;
  year = new Date().getFullYear();

  constructor(
    public auth: AuthService
  ) { }

  ngOnInit() {
  }

}
