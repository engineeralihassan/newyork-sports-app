import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.page.html',
  styleUrls: ['./error-page.page.scss'],
})
export class ErrorPagePage implements OnInit {
  page: any;
  route: any;
  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.page = this.adminService.loginAsAdmin ? 'Admin dashboard' : 'Home';
    this.route = this.adminService.loginAsAdmin ? '/admin' : '/home';
  }
}
