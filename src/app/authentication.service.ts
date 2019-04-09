import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import * as firebase from "firebase";
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  usersToken = "";

  constructor(public httpClient: HttpClient) {}

  registerUser(email, password) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(err => {
        console.log(err);
      });
  }

  loginUser(email, password) {
    let msg = new Subject();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(()=>{
        // signifies problem
        msg.next(1);
      })
      .then(() => {
        firebase
          .auth()
          .currentUser.getIdToken()
          .then(val => {
            this.usersToken = val;
            // signifies no problem
            msg.next(0);
          });
      });
    return msg;
  }

  logoutUser() {
    firebase.auth().signOut();
    this.usersToken = "";
  }

  getUsersToken() {
    // Updating it so it's most recent, for next usage.
    firebase
      .auth()
      .currentUser.getIdToken()
      .then(val => {
        this.usersToken = val;
      });
    return this.usersToken;
  }

  userLoggedIn() {
    return !(this.usersToken == "");
  }

  sendData(username, score) {
    return this.httpClient.post(
      "https://search-engine-battle.firebaseio.com/leaderboard.json?auth=" +
        this.getUsersToken(),
      { "name": username, "score": score }
    );
  }

  receiveData() {
    return this.httpClient.get(
      "https://search-engine-battle.firebaseio.com/leaderboard.json"
    );
  }
}
