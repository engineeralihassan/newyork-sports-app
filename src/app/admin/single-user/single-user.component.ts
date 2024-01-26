import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.scss'],
})
export class SingleUserComponent implements OnInit {
  user: any;
  userData: any;
  loading: any = false;
  constructor(private adminService: AdminService) {
    this.user = adminService.singleUser;
  }

  ngOnInit() {
    let newuser = { userId: this.user?.userId };
    this.singleUser(newuser);
  }
  singleUser(user: any) {
    this.loading = true;
    console.log('ffffffff', user);
    this.adminService.getsingleUser(user).subscribe(
      (data: any) => {
        console.log('The daa is the lsit ::', data);
        if (data.status) {
          this.userData = data.user;
        }
        console.log('The actual user is :::', this.userData);
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        console.log('error is occured', error);
      }
    );
  }
}
