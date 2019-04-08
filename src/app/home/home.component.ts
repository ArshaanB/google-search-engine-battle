import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../authentication.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  myObservable;
  scoreSubmitObservable;
  searchTerms = [];
  searchTermsVolume = [];
  term1: {name: string, volume: number};
  term2: {name: string, volume: number};
  winningTerm = "";
  showPlayButtonFlag = true;
  showScoreFlag = false;
  score = 0;
  lives = 3;
  
  constructor(public httpClient: HttpClient, 
              public authenticationService: AuthenticationService,
              public router: Router) {
  }
  
  ngOnInit() {
    // Acquires all search data and stores locally.
    this.myObservable = this.httpClient.get(
      'https://cors-anywhere.herokuapp.com/https://ahrefs.com/blog/top-google-searches/',
      { responseType: 'text' }
      );
    this.myObservable.subscribe( 
      (res) => { 
        $(res).find('tbody > tr')
        .each(
          (index, element) => {
            if (index < 99) {
              this.searchTerms.push($(element).find('td:nth-child(2)').text());
              this.searchTermsVolume.push($(element).find('td:nth-child(3)').text());
            }
          }
        )
      });
  }

  // Produces the URL for the img src attribute.
  myURL(term: number, t: HTMLInputElement) {
    let myTerm = this.term1;
    if (term === 2) myTerm = this.term2;

    // Working solution below, but a problem with Angular calling myURL 
    // infinitely is stopping me from using it.
    // fetch("https://source.unsplash.com/1600x900/?" + myTerm.name)
    //   .then(res => {
    //   if (res.url) {
    //     if(res.url == "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200") {
    //       t.src = "https://source.unsplash.com/random/1600x900";
    //     }
    //   }
    // });

    if (myTerm.name == "hotmail" ||
        myTerm.name == "roblox" ||
        myTerm.name == "zillow" || 
        myTerm.name == "indeed" ||
        myTerm.name == "ebay" ||
        myTerm.name == "yahoo" ||
        myTerm.name == "xfinity" ||
        myTerm.name == "walgreens" ||
        myTerm.name == "traductor" ||
        myTerm.name == "pof" ||
        myTerm.name == "123movies" ||
        myTerm.name == "mapquest" ||
        myTerm.name == "aol" ||
        myTerm.name == "gamestop" ||
        myTerm.name == "groupon" ||
        myTerm.name == "bing" ||
        myTerm.name == "kohls") {
          return "https://source.unsplash.com/random/1600x900";
    }
    return ("https://source.unsplash.com/1600x900/?" + myTerm.name);
    // Keep below for if primary image source fails. Bing is also another 
    // complete alternative.
    // return ("https://source.unsplash.com/featured/?" + term);
  }

  // Randomly picks 2 terms from our array.
  populateTerms() {
    let termIndex1 = Math.floor(Math.random() * 99);
    let termIndex2 = Math.floor(Math.random() * 99);
    while (true) {
      if (termIndex2 == termIndex1) {
        termIndex2 = Math.floor(Math.random() * 99);
      }
      else {
        break;
      }
    }
    this.term1 = {name: this.searchTerms[termIndex1], volume: this.searchTermsVolume[termIndex1]};
    this.term2 = {name: this.searchTerms[termIndex2], volume: this.searchTermsVolume[termIndex2]};

    if (this.term1.volume > this.term2.volume) {
      this.winningTerm = this.term1.name;
    } else {
      this.winningTerm = this.term2.name;
    }
  }

  togglePlayButtonFlag() {
    this.showPlayButtonFlag = !this.showPlayButtonFlag;
  }

  // Ensures score correctly reflects choices made by user. If the game is over 
  // (since lives hits 0) show correct screen.
  onAnswer(answer: number) {
    if ((answer == 1) && (this.winningTerm == this.term1.name)) {
      this.score++;
    }
    else if ((answer == 2) && (this.winningTerm == this.term2.name)) {
      this.score++;
    }
    else {
      this.lives--;
    }
    this.populateTerms();
    if (this.lives == 0) {
      this.togglePlayButtonFlag();
      this.showScoreFlag = true;
    }
    // Especially useful on smaller devices, brings the screen back to the top 
    // thus saving the user time wasted in scrolling.
    window.scroll(0,0);
  }

  // Used at the beginning and in order to re-play the game.
  playGame() {
    this.populateTerms();
    this.lives = 3;
    this.score = 0;
    this.togglePlayButtonFlag();
    this.showScoreFlag = false;
  }

  // Small variations in messages as per user's end score.
  endscreenMessage() {
    if (this.score <= 5) return "Meh, I know you can do better than that.";
    else if (this.score <= 10) return "That's pretty good, but even my grandma got 9.";
    else return "Dang, you've got skill, you single?";
  }

  isUserLoggedIn() {
    return this.authenticationService.userLoggedIn();
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.scoreSubmitObservable = this.authenticationService.sendData(form.value.username, this.score);
    this.scoreSubmitObservable.subscribe( () => { console.log("success") } );
    setTimeout(() => {
      this.router.navigate(["/leaderboard"]);
    }, 500);
  }
}