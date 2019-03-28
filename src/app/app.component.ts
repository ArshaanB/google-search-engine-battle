import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as $ from 'jquery';
import * as pup from 'puppeteer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  myObservable;
  searchTerms;
  
  constructor(public httpClient: HttpClient) {
  }
  
  ngOnInit() {
    this.searchTerms = [];
    // this.myObservable = this.httpClient.get(
    //   'https://cors-anywhere.herokuapp.com/https://trends.google.com/trends/trendingsearches/daily?geo=US',
    //   { responseType: 'text' }
    //   );
    // this.myObservable.subscribe( 
    //   (res) => { 
    //     // console.log($(res).find('ng-include > div > div').length);
    //     console.log(res);
    //   })
    
  }
}
