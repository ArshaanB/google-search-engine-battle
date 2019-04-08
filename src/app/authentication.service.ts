import { Injectable } from '@angular/core';

import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  usersToken = '';

  constructor() { }

  registerUser(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch( (err) => {
        console.log(err);
      })
  }

  loginUser(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch( (err) => {
        console.log(err);
      })
    firebase.auth().currentUser.getIdToken().then(
      (val) => { this.usersToken = val; }
    );
  }

  logoutUser() {
    firebase.auth().signOut();
    this.usersToken = '';
  }

  getUsersToken() {
    // Updating it so it's most recent, for next usage.
    firebase.auth().currentUser.getIdToken().then(
      (val) => { this.usersToken = val; }
    );
    return this.usersToken;
  }

  userLoggedIn() {
    return !(this.usersToken == '');
  }
}
