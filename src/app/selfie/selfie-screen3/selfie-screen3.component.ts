import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatchesService } from 'src/app/services/matches.service';

@Component({
  selector: 'app-selfie-screen3',
  templateUrl: './selfie-screen3.component.html',
  styleUrls: ['./selfie-screen3.component.scss'],
})
export class SelfieScreen3Component  implements OnInit {
  data:any;
  isLoading=false;
  constructor(private router:Router,private dataService:MatchesService) { }
   photo:any;
   imageSrc: string | undefined;
   ngOnInit() {
    this.photo = this.dataService.photos[0];
    this.data = this.dataService.getObject();
    console.log(this.data, this, this.photo, "hello");
  
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
    formData.append('lat', '31.4913359');
    formData.append('long', '74.3939224');
    formData.append('registrationId', this.data?.registrationId);
    formData.append('userId', this.data?.userId);
    formData.append('gameId', this.data?.gameId);
    formData.append('image', this.photo);
    this.isLoading = true;
    this.dataService.ProceedMatch(formData).subscribe((data) => {
      this.isLoading = false;
      if(data.status){
        this.router.navigate(['checkin']);
      }else{
        this.dataService.checkinFail=true;
        this.router.navigate(['checkin']);

      }
      console.log("this is the return data", data);
    });
  }
  }


