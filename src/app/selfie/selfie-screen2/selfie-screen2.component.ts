import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatchesService } from 'src/app/services/matches.service';

@Component({
  selector: 'app-selfie-screen2',
  templateUrl: './selfie-screen2.component.html',
  styleUrls: ['./selfie-screen2.component.scss'],
})
export class SelfieScreen2Component  implements OnInit {
  data:any;
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
  upload(){
   this.router.navigate(['selfie/screen3'])
  }



}
