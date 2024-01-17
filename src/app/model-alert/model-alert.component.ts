import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-model-alert',
  templateUrl: './model-alert.component.html',
  styleUrls: ['./model-alert.component.scss'],
})
export class ModelAlertComponent  implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {}
  navigations(){
    this.router.navigate(['verification/otp-verification']);
  }

}
