import { Component, OnInit } from '@angular/core';
import { MatchesService } from '../services/matches.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.page.html',
  styleUrls: ['./checkin.page.scss'],
})
export class CheckinPage implements OnInit {
  screen2 = false;
  constructor(private matcheService: MatchesService, private router: Router) {}

  ngOnInit() {
    if (this.matcheService.checkinFail) {
      this.changeScreen();
    }
  }
  changeScreen() {
    this.screen2 = true;
  }
  goHome() {
    this.router.navigate(['/home']);
  }
}
