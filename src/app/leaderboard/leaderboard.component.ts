import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  leaderboardObservable;
  updatingLeaderboardObservable;
  leaderboardArray = [];
  dataRetreived = false;

  constructor(public authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.leaderboardObservable = this.authenticationService.receiveData();
    this.leaderboardObservable.subscribe(
      (val) => { 
        Object.keys(val).forEach(key => {
          this.leaderboardArray.push(val[key]);
        });
        this.leaderboardArray.sort( (a, b) => {
          if (a["score"] > b["score"]) { return -1; }
          else return 1;
        });
        this.dataRetreived = true;
      }
    );
  }
}
