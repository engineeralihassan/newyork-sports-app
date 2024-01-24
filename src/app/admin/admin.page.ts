import { Component, OnInit } from '@angular/core';

import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  items: any = [];

  private generateItems() {
    const count = this.items.length + 1;
    for (let i = 0; i < 50; i++) {
      this.items.push(`Item ${count + i}`);
    }
  }

  onIonInfinite(ev: any) {
    console.log('The data is loading again');
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 3500);
  }

  isAuthenticated: boolean = false;
  user: any = null;
  isShopPage: boolean = false;
  cartLength: number = 0;

  favLength: number = 0;

  ngOnInit(): void {}

  navigate: any;
  constructor(private platform: Platform) {
    this.sideMenu();
  }

  sideMenu() {
    this.navigate = [
      {
        title: 'Home',
        url: '/home',
        icon: 'home',
      },
      {
        title: 'Shop',
        url: '/shop',
        icon: 'basket',
      },
      {
        title: 'checkout',
        url: '/checkout',
        icon: 'cash-outline',
      },
      {
        title: 'Contacts',
        url: '/contact-us',
        icon: 'person',
      },
    ];
  }
}
