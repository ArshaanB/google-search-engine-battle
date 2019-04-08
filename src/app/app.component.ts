import { Component, OnInit } from "@angular/core";

import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import * as firebase from "firebase";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  
  constructor(public authenticationService: AuthenticationService) {}

  ngOnInit() {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyAxEeYpjKtpC1JNbTFNJL7aKUzdg6lXH40",
      authDomain: "search-engine-battle.firebaseapp.com",
      databaseURL: "https://search-engine-battle.firebaseio.com",
      projectId: "search-engine-battle",
      storageBucket: "search-engine-battle.appspot.com",
      messagingSenderId: "246186518610"
    };
    firebase.initializeApp(config);
  }

  userLoggedIn() {
    return this.authenticationService.userLoggedIn();
  }

  logout() {
    this.authenticationService.logoutUser();
  }
}
