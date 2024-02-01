import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatchesService } from 'src/app/services/matches.service';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-selfie-screen3',
  templateUrl: './selfie-screen3.component.html',
  styleUrls: ['./selfie-screen3.component.scss'],
})
export class SelfieScreen3Component implements OnInit {
  data: any;
  isLoading = false;
  showAlert = false;
  errorMesg = 'something went wrong try again';
  private timerSubscription: Subscription | undefined;
  locationObj = { lat: '', long: '' };
  constructor(
    private router: Router,
    private dataService: MatchesService,
    private service: MatchesService
  ) {}
  photo: any;
  location: any;
  imageSrc: string | undefined;
  ngOnInit() {
    this.service.getLocationStatus().subscribe((status) => {
      this.location = status;
      console.log('Location Data is ', this.location);
    });
    this.photo = this.dataService.photos[0];
    this.data = this.dataService.getObject();
    if (this.photo) {
      this.displayImage();
    }
  }

  displayImage() {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.imageSrc = reader.result as string;
    };
    reader.readAsDataURL(this.photo);
  }
  onProceed() {
    this.isLoading = true;
    const formData = new FormData();
    formData.append('lat', this.location?.coords?.latitude);
    formData.append('long', this.location?.coords?.longitude);
    formData.append('registrationId', this.data?.registrationId);
    formData.append('userId', this.data?.userId);
    formData.append('gameId', this.data?.gameId);
    formData.append('image', this.photo);
    this.isLoading = true;
    if (this.location?.coords?.latitude && this.location?.coords?.longitude) {
      this.dataService.ProceedMatch(formData).subscribe(
        (data) => {
          this.isLoading = false;
          if (data.status) {
            this.router.navigate(['checkin']);
          } else {
            this.isLoading = false;
            this.dataService.checkinFail = true;
            this.router.navigate(['checkin']);
          }
          console.log('this is the return data', data);
        },
        (error) => {
          this.isLoading = false;
          this.showAndHideAlert();
          console.log('The error is occured', error);
        }
      );
    } else {
      this.isLoading = false;
      this.showAlert = true;
      this.errorMesg = 'check your location';
      this.showAndHideAlert();
      this.service.checkAndRequestLocationPermission();
    }
  }

  showAndHideAlert(): void {
    this.showAlert = true;

    this.timerSubscription = timer(4000).subscribe(() => {
      this.showAlert = false;
    });
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
