import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from './user.model';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { HelperService } from '../shared/helper.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('data') signupForm: NgForm;
  error = "";
  isError = false;
  submitted = false;
  user: User;
  
  constructor(
    private auth: AuthService,
    private helpers: HelperService,
    private router: Router
    ) {}

  ngOnInit(){
    this.isError = false;
    this.submitted = true;
  }

  onSubmit(){
    this.signupForm.value.name = this.prepName(this.signupForm.value.name);
    this.auth.registerUser(this.signupForm.value)
    .subscribe(() => {
      this.router.navigate(["login"])
    },
    () => {
      this.isError = true
      this.error = "an account with that email already exists!";
    });
  }

  prepName(name: string){
    return this.helpers.capitalize(name);
  }

}