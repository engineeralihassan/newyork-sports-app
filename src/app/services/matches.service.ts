import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  private myObject: any;
  private objectSubject = new BehaviorSubject<any>(null);

  setObject(obj: any): void {
    this.myObject = obj;
    this.objectSubject.next(obj); // Notify subscribers about the change
  }

  getObject(): any {
    return this.myObject;
  }

  getObjectSubject(): BehaviorSubject<any> {
    return this.objectSubject;
  }
}
