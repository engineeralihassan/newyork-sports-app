import { Component, ViewChild, ElementRef } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { DatePipe } from '@angular/common';
import { MatchesService } from '../services/matches.service';
import { Subscription, timer } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

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
  isSearching = false;
  activeFilter: string = 'All Matches';
  progamState: any = '';
  isAuthenticated = true;

  constructor(
    private router: Router,
    private authService: AuthService,
    private datePipe: DatePipe,
    private matchesService: MatchesService
  ) {}
  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (event.url === '/home' || event.urlAfterRedirects === '/home') {
          this.ngOnInit();
        }
      });
    this.fetchData();
    this.matchesService.checkAndRequestLocationPermission();
  }
  fetchData() {
    this.isLoading = true;
    this.authService.getGames(this.progamState).subscribe(
      (data) => {
        if (data.status) {
          this.matchesRecordsData = data.programs;
          this.matches = data.programs;
          this.isLoading = false;
        }
      },
      (error) => {
        this.isLoading = false;

        if (error.status === 401) {
          this.isAuthenticated = false;
        }
        console.log(error);
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
  setActiveFilter(filter: string) {
    this.isSearching = true;
    this.activeFilter = filter;
    if (filter.includes('All')) {
      this.progamState = '';
      this.fetchData();
    } else {
      this.progamState = 'COMPLETED';
      this.fetchData();
    }
  }
  formateDateTime(time: any) {
    return this.datePipe.transform(time, 'EEE, MMM d, yyyy');
  }
  updateSearch(): void {
    if (!this.searchText) {
      this.matches = this.matchesRecordsData;
    } else {
      this.matches = this.filterRecords(this.matches, this.searchText);
    }
  }

  formatDate(dateString: string): any {
    const apiDate = new Date(dateString);
    return this.datePipe.transform(apiDate, 'MM/dd/yyyy h:mm:ss a');
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
