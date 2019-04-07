import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthenticationService } from './authentication.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  myObservable;
  searchTerms = [];
  searchTermsVolume = [];
  term1: {name: string, volume: number};
  term2: {name: string, volume: number};
  winningTerm = "";
  playButtonFlag = true;
  showScore = false;
  score = 0;
  lives = 3;
  
  constructor(public httpClient: HttpClient, 
              public authenticationServide: AuthenticationService) {
  }
  
  ngOnInit() {
    // Grabs all search data and stores locally.
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
  // Grabs the URL for the img src attribute.
  myURL(term: number) {
    let myTerm = this.term1;
    if (term === 2) myTerm = this.term2;
    return ("https://source.unsplash.com/1600x900/?" + myTerm.name);
    // Keep below for if primary image source fails. Bing is also another complete alternative.
    // return ("https://source.unsplash.com/featured/?" + term);
  }

  // 
  populateTerms() {
    let termIndex1 = Math.floor(Math.random() * 50);
    let termIndex2 = Math.floor(Math.random() * 50);
    this.term1 = {name: this.searchTerms[termIndex1], volume: this.searchTermsVolume[termIndex1]};
    this.term2 = {name: this.searchTerms[termIndex2], volume: this.searchTermsVolume[termIndex2]};
    
    this.playButtonFlag = false;
    if (this.term1.volume > this.term2.volume) {
      this.winningTerm = this.term1.name;
    } else {
      this.winningTerm = this.term2.name;
    }
    this.showScore = false;
  }

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
      this.playButtonFlag = true;
      this.showScore = true;
    }
    window.scroll(0,0);
  }

  playGame() {
    this.populateTerms();
    this.lives = 3;
    this.score = 0;
  }

  endscreenMessage() {
    if (this.score <= 5) return "Meh, I know you can do better than that.";
    else if (this.score <= 10) return "That's pretty good, but even my grandma got 9.";
    else return "Dang, you've got skill, you single?";
  }
}
