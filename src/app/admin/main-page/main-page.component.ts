import {
  Component,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatchesService } from 'src/app/services/matches.service';
import { Subscription, timer } from 'rxjs';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { AdminService } from 'src/app/services/admin.service';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

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
  isOpenModal: boolean = false;
  modalElement!: HTMLElement;
  modelLoading = false;
  isSearching = false;
  modelData: any;
  apiUrl = environment.admin;
  activeIndex: number = -1;
  activeFilter: string = 'All Matches';
  progamState: any = '';

  constructor(
    private platform: Platform,
    private router: Router,
    private datePipe: DatePipe,
    private matchesService: MatchesService,
    private adminService: AdminService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.getAllGames(this.progamState, this.page, this.limit, this.searchText);
  }

  fetchSingleUser(user: any) {
    console.log('the user is ::', user);
    this.adminService.singleUser = user;
    this.closeModal();
    setTimeout(() => {
      this.router.navigate(['/admin/user']);
    }, 1000);
  }
  openModal1(index: number, match: any) {
    console.log('Match is ::', match);
    let newobj = { gameId: match.gameId };
    this.modelLoading = true;
    this.adminService.getCheckins(newobj).subscribe((data: any) => {
      console.log('model data sjsss', data.game);
      if (data.status) {
        this.modelData = data.game;
      }
      this.modelLoading = false;
    });

    if (this.activeIndex === index && this.isOpenModal) {
      this.closeModal();
    } else {
      this.isOpenModal = true;
      this.activeIndex = index;
    }
  }
  backdropTaped() {
    this.closeModal();
  }

  closeModal() {
    this.isOpenModal = false;
    this.activeIndex = -1;
  }
  setActiveFilter(filter: string) {
    this.isSearching = true;
    this.page = 1;
    this.activeFilter = filter;
    if (filter.includes('All')) {
      this.progamState = '';
      this.getAllGames(
        this.progamState,
        this.page,
        this.limit,
        this.searchText
      );
    } else {
      this.progamState = 'COMPLETED';
      this.getAllGames(
        this.progamState,
        this.page,
        this.limit,
        this.searchText
      );
    }
  }

  reSetRecords(ev: any) {
    this.isLoadMoreData = true;
    if (!this.searchText) {
      this.isSearching = true;
      this.matches = [];
      this.matchesRecordsData = [];
      this.getAllGames(
        this.progamState,
        this.page,
        this.limit,
        this.searchText
      );
    }
  }
  loadMoreData(event: any) {
    this.page += 1;
    let data = { programState: this.progamState };
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
        if (data.games.length < 50) {
          this.isLoadMoreData = false;
          console.log('progrma to vr gia33');
        } else {
          console.log('progrma to vr gia');
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
  formateDateTime(time: any) {
    return this.datePipe.transform(time, 'EEE, MMM d, yyyy');
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
          this.isSearching = false;
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
    this.router.navigate(['admin/usersdetail']);
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
      this.isSearching = true;
      this.matches = [];
      this.matchesRecordsData = [];
      this.getAllGames(
        this.progamState,
        this.page,
        this.limit,
        this.searchText
      );
    }
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
