import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  myObservable;
  searchTerms;
  searchTermsVolume;
  
  constructor(public httpClient: HttpClient) {
  }
  
  ngOnInit() {
    this.searchTerms = [];
    this.searchTermsVolume = [];
    this.myObservable = this.httpClient.get(
      'https://cors-anywhere.herokuapp.com/https://ahrefs.com/blog/top-google-searches/',
      { responseType: 'text' }
      );
    this.myObservable.subscribe( 
      (res) => { 
        $(res).find('tbody > tr')
        .each(
          (index, element) => {
            if (index < 10) {
              this.searchTerms.push($(element).find('td:nth-child(2)').text());
              this.searchTermsVolume.push($(element).find('td:nth-child(3)').text());
            }
          }
        )
      });
  }

  myURL(term: String) {
    // return ("https://source.unsplash.com/featured/?" + term);
    return ("https://source.unsplash.com/1600x900/?" + term);
    // https://www.flickr.com/services/api/flickr.photos.search.html
  }
}
