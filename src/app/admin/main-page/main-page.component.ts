import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatchesService } from 'src/app/services/matches.service';
import { Subscription, timer } from 'rxjs';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  limit = 50;
  navigate: any;
  page: number = 1;
  @ViewChild('myButton2') myButton!: ElementRef;
  private timerSubscription: Subscription | undefined;
  showInput = false;
  isLoading = false;
  matches: any[] = [];
  searchText: string = '';
  matchesRecordsData: any;
  showAlert = false;
  errorMesg = 'something went wrong try again';
  isLoadMoreData: any = true;
  constructor(
    private platform: Platform,
    private router: Router,
    private datePipe: DatePipe,
    private matchesService: MatchesService,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.getAllGames('', this.page, this.limit, this.searchText);
  }

  reSetRecords(ev: any) {
    if (!this.searchText) {
      this.isLoading = true;
      this.matches = [];
      this.matchesRecordsData = [];
      this.getAllGames('', this.page, this.limit, this.searchText);
    }
  }
  loadMoreData(event: any) {
    this.page += 1;
    let data = { programState: '' };
    let newParams = {
      page: this.page,
      limit: this.limit,
      search: this.searchText,
    };
    this.adminService.GetMatchesAsAdmin(data, newParams).subscribe(
      (data: any) => {
        if (data.status) {
          this.matches = [...this.matches, ...data.games];
          this.matchesRecordsData = [...this.matches];
          this.isLoading = false;
          (event.target as HTMLIonInfiniteScrollElement).complete();
        }
      },
      (error) => {
        this.isLoading = false;
        this.showAndHideAlert();
        this.errorMesg = 'Please Login first your token is expired ';
        (event.target as HTMLIonInfiniteScrollElement).complete();
      }
    );
  }

  openModal() {
    this.myButton.nativeElement.click();
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
        if (data.status) {
          this.matches = [...this.matches, ...data.games];
          this.matchesRecordsData = [...this.matches];
          this.isLoading = false;
          if (this.matches.length < this.limit) {
            this.isLoadMoreData = false;
          }
        }
      },
      (error) => {
        this.isLoading = false;
        this.showAndHideAlert();
        this.errorMesg = 'Something went wrong try again';
      }
    );
  }
  formatTime(timestamp: string): string {
    const date = new Date(Number(timestamp));
    const formattedTime = this.datePipe.transform(date, 'ha');
    return formattedTime || '';
  }
  onButtonClick(obj: any): void {
    console.log('The details button click');
  }

  toggleInput() {
    this.showInput = !this.showInput;
  }
  showAndHideAlert(): void {
    this.showAlert = true;
    this.timerSubscription = timer(4000).subscribe(() => {
      this.showAlert = false;
    });
  }

  searchData() {
    this.page = 1;
    if (this.searchText) {
      this.isLoading = true;
      this.matches = [];
      this.matchesRecordsData = [];
      this.getAllGames('', this.page, this.limit, this.searchText);
    }
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
