import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authenticationService: AuthenticationService,
              public router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.authenticationService.loginUser(form.value.email, form.value.password);
    this.router.navigate(['']);
  }

}
