import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  showFailureMessage = false;

  constructor(
    public authenticationService: AuthenticationService,
    public router: Router
    ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.authenticationService.registerUser(form.value.email, form.value.password)
    .then(msg => {
      this.authenticationService.loginUser(form.value.email, form.value.password);
      this.router.navigate(['/']);
    })
    .catch(err => {
      this.showFailureMessage = true;
    });
  }

}
