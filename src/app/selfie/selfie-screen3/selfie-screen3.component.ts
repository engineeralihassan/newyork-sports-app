import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatchesService } from 'src/app/services/matches.service';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-selfie-screen3',
  templateUrl: './selfie-screen3.component.html',
  styleUrls: ['./selfie-screen3.component.scss'],
})
export class SelfieScreen3Component  implements OnInit {
  data:any;
  isLoading=false;
  showAlert = false;
  errorMesg='something went wrong try again';
  private timerSubscription: Subscription | undefined;
  locationObj={lat:'',long:''};
  constructor(private router:Router,private dataService:MatchesService) { }
   photo:any;
   imageSrc: string | undefined;
   ngOnInit() {
    this.getLocation();
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
    formData.append('lat', this.locationObj.lat);
    formData.append('long', this.locationObj.long);
    formData.append('registrationId', this.data?.registrationId);
    formData.append('userId', this.data?.userId);
    formData.append('gameId', this.data?.gameId);
    formData.append('image', this.photo);
    this.isLoading = true;
    if(this.locationObj.lat && this.locationObj.long){
      this.dataService.ProceedMatch(formData).subscribe((data) => {
        this.isLoading = false;
        if(data.status){
          this.router.navigate(['checkin']);
        }else{
          this.isLoading=false;
          this.dataService.checkinFail=true;
          this.router.navigate(['checkin']);
  
        }
        console.log("this is the return data", data);
      },
      (error)=>{
        this.isLoading=false;
        this.showAndHideAlert()
        console.log("The error is occured",error);
      });
    }else{
      this.isLoading=false;
      this.showAlert=true;
      this.errorMesg='check your location';
      this.showAndHideAlert();
    }
    
  }



  showAndHideAlert(): void {
    this.showAlert = true;

    this.timerSubscription = timer(4000).subscribe(() => {
      this.showAlert = false;
      
    });
  }

  getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position: any) => this.showPosition(position),
            (error: any) => this.showError(error)
        );
    } else {
        this.showAlert = true;
        this.errorMesg = 'Geolocation is not supported by this browser.';
        this.showAndHideAlert();
    }
}

showPosition(position: any) {
   console.log(position);
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    this.locationObj={lat:latitude,long:longitude};
}

showError(error: any) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            this.showAlert = true;
            this.errorMesg = 'Geolocation is not supported by this browser.';
            this.showAndHideAlert();
            break;
        case error.POSITION_UNAVAILABLE:
          this.showAlert = true;
          this.errorMesg = 'Location information is unavailable.';
          this.showAndHideAlert();
          
            break;
        case error.TIMEOUT:
          this.showAlert = true;
          this.errorMesg = 'The request to get user location timed out.';
          this.showAndHideAlert();
            break;
        case error.UNKNOWN_ERROR:
          this.showAlert = true;
          this.errorMesg = 'An unknown error occurred.';
          this.showAndHideAlert();
            break;
    }
}


  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
  }


