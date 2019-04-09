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
  loginFailFlag = false;

  constructor(public authenticationService: AuthenticationService,
              public router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    let msg = this.authenticationService.loginUser(form.value.email, form.value.password);
    
    msg.subscribe((val)=>{
      if (val == 0) {
        this.router.navigate(['']);
      } else {
        this.loginFailFlag = true;
      }
    });
  }
}
