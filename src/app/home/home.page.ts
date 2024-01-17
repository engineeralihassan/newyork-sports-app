import { Component, } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  showInput=false;
  isLoading=false;
  matches:any[]=[];
  searchText: string = '';
  matchesRecordsData:any;

  constructor(private router:Router, private authService:AuthService,private datePipe: DatePipe) {
  }
  ngOnInit(){
  this.isLoading=true;
  this.authService.getGames().subscribe((data)=>{
    if(data.status){
      this.matchesRecordsData=data.programs;
      this.matches=data.programs;


      this.isLoading=false;
    }
  })
  }
  formatTime(timestamp: string): string {
    const date = new Date(Number(timestamp));
    const formattedTime = this.datePipe.transform(date, 'ha');

    return formattedTime || '';
  }
  toggleInput(){
    this.showInput=!this.showInput;
  }
  private isValidDate(date: Date): boolean {
    return !isNaN(date.getTime());
  }
  filterRecords(records: any[], searchText: string): any[] {
    return records.filter(
      (record) =>
        record.team1.toLowerCase().includes(searchText.toLowerCase()) ||
        record.team2.toLowerCase().includes(searchText.toLowerCase())
    );
  }
  updateSearch(): void {
    if(!this.searchText){
      this.matches=this.matchesRecordsData;
    }else{
     this.matches= this.filterRecords(this.matches,this.searchText);
    }
   
  }
}
