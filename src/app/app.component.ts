import { Component, OnInit } from "@angular/core";

import { AuthenticationService } from './authentication.service';

import * as firebase from "firebase";
import { HttpClient } from '@angular/common/http';
import { SearchDataService } from './search-data.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {

  constructor(
    public authenticationService: AuthenticationService,
    public httpClient: HttpClient,
    public searchDataService: SearchDataService
    ) {}

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
    // Grabbing Data
    this.searchDataService.getTermsRequest();
  }

  userLoggedIn() {
    return this.authenticationService.userLoggedIn();
  }

  logout() {
    this.authenticationService.logoutUser();
  }
}
