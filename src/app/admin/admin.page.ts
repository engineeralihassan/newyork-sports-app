import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DatePipe } from '@angular/common';
import { MatchesService } from '../services/matches.service';
import { Subscription, timer } from 'rxjs';

import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { AdminService } from '../services/admin.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage {
  items: any = [];
  isAuthenticated: boolean = false;
  user: any = null;
  isShopPage: boolean = false;
  cartLength: number = 0;
  limit = 50;
  favLength: number = 0;
  navigate: any;
  page: number = 1;
  @ViewChild('myButton') myButton!: ElementRef;
  private timerSubscription: Subscription | undefined;
  showInput = false;
  isLoading = false;
  matches: any[] = [];
  searchText: string = '';
  matchesRecordsData: any;
  showAlert = false;
  errorMesg = 'something went wrong try again';
  isLoadMoreData: any = true;
  reSetRecords(ev: any) {
    console.log('serched value is ', ev.target.value);
    console.log('Hello mr calls');
    if (!this.searchText) {
      this.isLoading = true;
      this.matches = [];
      this.matchesRecordsData = [];
      this.getAllGames('', this.page, this.limit, this.searchText);
    }
  }
  loadMoreData(event: any) {
    console.log('The data is loadedmore called');
    this.page += 1;
    let data = { programState: '' };
    let newParams = {
      page: this.page,
      limit: this.limit,
      search: this.searchText,
    };

    console.log('i am in if condition');
    this.adminService.GetMatchesAsAdmin(data, newParams).subscribe(
      (data: any) => {
        console.log('Params are fetched::', data);
        if (data.status) {
          this.matches = [...this.matches, ...data.games];
          this.matchesRecordsData = [...this.matches];
          console.log(
            'Matched',
            this.matches,
            'hhhhhhhh',
            this.matchesRecordsData
          );
          this.isLoading = false;
          (event.target as HTMLIonInfiniteScrollElement).complete();
        }
      },
      (error) => {
        this.isLoading = false;
        this.showAndHideAlert();
        this.errorMesg = 'Please Login first your token is expired ';
        this.router.navigate(['auth']);
        (event.target as HTMLIonInfiniteScrollElement).complete();
      }
    );
  }

  constructor(
    private platform: Platform,
    private router: Router,
    private authService: AuthService,
    private datePipe: DatePipe,
    private matchesService: MatchesService,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.getAllGames('', this.page, this.limit, this.searchText);
  }
  getAllGames(progState: any, page: any, limit: any, search: any) {
    this.matches = [];
    this.matchesRecordsData = [];
    let data = { programState: progState };
    let newParams = {
      page: page,
      limit: limit,
      search: search,
    };
    this.adminService.GetMatchesAsAdmin(data, newParams).subscribe(
      (data: any) => {
        console.log('Params are fetched::', data);
        if (data.status) {
          this.matches = [...this.matches, ...data.games];
          this.matchesRecordsData = [...this.matches];
          console.log(
            'Matched',
            this.matches,
            'hhhhhhhh',
            this.matchesRecordsData
          );
          this.isLoading = false;
          console.log('Hellloooooooo');
          if (this.matches.length < this.limit) {
            console.log('The data is loaded no more');
            this.isLoadMoreData = false;
          }
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

  searchData() {
    this.page = 1;
    console.log('Hello mr calls');
    if (this.searchText) {
      this.isLoading = true;
      this.matches = [];
      this.matchesRecordsData = [];
      this.getAllGames('', this.page, this.limit, this.searchText);
    } else {
      this.matches = [];
      this.matchesRecordsData = [];
      this.getAllGames('', this.page, this.page, this.searchText);
    }
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
