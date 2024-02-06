import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatchesService } from '../../services/matches.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-model-alert',
  templateUrl: './model-alert.component.html',
  styleUrls: ['./model-alert.component.scss'],
})
export class ModelAlertComponent implements OnInit {
  checkInData: any;
  photo: any;
  constructor(
    private router: Router,
    private dataService: MatchesService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.getObject();
    this.photo = this.dataService.photos[0];
  }
  getObject(): any {
    this.dataService.getObjectSubject().subscribe((obj) => {
      console.log('the data is chnaged', obj);
      this.checkInData = obj;
    });
  }
  navigations() {
    this.router.navigate(['verification/otp-verification']);
  }
  logout() {
    localStorage.removeItem('nasaTocken');
    this.router.navigate(['auth']);
  }
  addPhotoToGallery() {
    console.log('button is clicked');
    this.dataService.addNewToGallery();
  }
  onProceed() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      console.log('Geolocation is not supported by this browser.');
    }

    function showPosition(position: any) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log('Latitude: ' + latitude + ', Longitude: ' + longitude);

      return { lat: latitude, long: longitude };
    }

    function showError(error: any) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.log('User denied the request for Geolocation.');
          break;
        case error.POSITION_UNAVAILABLE:
          console.log('Location information is unavailable.');
          break;
        case error.TIMEOUT:
          console.log('The request to get user location timed out.');
          break;
        case error.UNKNOWN_ERROR:
          console.log('An unknown error occurred.');
          break;
      }
    }
  }

  checkInProceed(data: any) {
    this.dataService.ProceedMatch(data).subscribe((data) => {
      console.log('the data is  : hasle', data);
    });
  }

  formatDate(dateString: string): any {
    const apiDate = new Date(dateString);
    return this.datePipe.transform(apiDate, 'MM/dd/yyyy h:mm:ss a');
  }
}
