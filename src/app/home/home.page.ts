import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DatePipe } from '@angular/common';
import { MatchesService } from '../services/matches.service';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('myButton') myButton!: ElementRef;
  private timerSubscription: Subscription | undefined;
  showInput = false;
  isLoading = false;
  matches: any[] = [];
  searchText: string = '';
  matchesRecordsData: any;
  showAlert = false;
  errorMesg = 'something went wrong try again';

  constructor(
    private router: Router,
    private authService: AuthService,
    private datePipe: DatePipe,
    private matchesService: MatchesService
  ) {}
  ngOnInit() {
    this.isLoading = true;
    this.authService.getGames().subscribe(
      (data) => {
        if (data.status) {
          this.matchesRecordsData = data.programs;
          this.matches = data.programs;
          this.isLoading = false;
        }
      },
      (error) => {
        this.isLoading = false;
        this.showAndHideAlert();
        this.errorMesg = 'Please Login first your tocken is expired ';
        this.router.navigate(['auth']);
      }
    );
  }
  formatTime(timestamp: string): string {
    const date = new Date(Number(timestamp));
    const formattedTime = this.datePipe.transform(date, 'ha');
    return formattedTime || '';
  }
  onButtonClick(obj: any): void {
    this.matchesService.setObject(obj);
  }
  toggleInput() {
    this.showInput = !this.showInput;
  }
  private isValidDate(date: Date): boolean {
    return !isNaN(date.getTime());
  }
  showAndHideAlert(): void {
    this.showAlert = true;

    this.timerSubscription = timer(4000).subscribe(() => {
      this.showAlert = false;
    });
  }
  filterRecords(records: any[], searchText: string): any[] {
    return records.filter(
      (record) =>
        record.team1.toLowerCase().includes(searchText.toLowerCase()) ||
        record.team2.toLowerCase().includes(searchText.toLowerCase())
    );
  }
  updateSearch(): void {
    if (!this.searchText) {
      this.matches = this.matchesRecordsData;
    } else {
      this.matches = this.filterRecords(this.matches, this.searchText);
    }
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
