import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @ViewChild('myButton2') myButton!: ElementRef;
  constructor() {}
  navigate: any;
  openModal() {
    console.log('Hello Ali Clicked');
    this.myButton.nativeElement.click();
  }
}
