import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manu-tabs',
  templateUrl: './manu-tabs.component.html',
  styleUrls: ['./manu-tabs.component.scss'],
})
export class ManuTabsComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}
  activeTab: string = 'home';

  changeTab(tab: string) {
    this.activeTab = tab;
  }

}
