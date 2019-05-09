import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchDataService {
  termsArray = [];
  displayPlay = false;

  constructor(public httpClient: HttpClient) { }

  getTermsRequest() {
    this.httpClient.get<{ message: string, terms: any }>("http://localhost:3000/api/terms").subscribe(someArg => {
      this.termsArray = someArg.terms;
    }, err => {
      console.log("Failure");
    });
  }

  getTerms() {
    return this.termsArray;
  }

  getDisplayPlay() {
    return this.displayPlay;
  }
}

