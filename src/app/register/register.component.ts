import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  showSuccessMessage = false;

  constructor(public authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.showSuccessMessage = true;
    this.authenticationService.registerUser(form.value.email, form.value.password);
  }

}
