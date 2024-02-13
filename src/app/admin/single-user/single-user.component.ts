import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.scss'],
})
export class SingleUserComponent implements OnInit {
  user: any;
  userData: any;
  loading: any = false;
  url = environment.admin;

  constructor(
    private adminService: AdminService,
    private datePipe: DatePipe,
    private location: Location
  ) {
    this.user = adminService.singleUser;
  }

  ngOnInit() {
    let newuser = { userId: this.user?.userId, checkInId: this.user?.id };
    this.singleUser(newuser);
  }
  transformDate(dateString: string): string | null {
    const date = new Date(dateString);
    return this.datePipe.transform(date, 'EEE, MMMM dd, yyyy');
  }
  goBack() {
    this.location.back();
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
