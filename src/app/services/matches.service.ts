import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Device } from '@capacitor/device';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@capacitor/geolocation';
@Injectable({
  providedIn: 'root',
})
export class MatchesService {
  public photos: any[] = [];
  photo: any;
  private myObject: any;
  private objectSubject = new BehaviorSubject<any>(null);
  private photoSubject = new BehaviorSubject<any>(null);
  private locationSubject = new BehaviorSubject<any>(null);
  constructor(private router: Router, private http: HttpClient) {}
  checkinFail = false;
  apiUrl = environment.apiUrl;
  setObject(obj: any): void {
    this.myObject = obj;
    this.objectSubject.next(obj);
  }
  setPhoto(obj: any): void {
    this.photo = obj;
    this.photoSubject.next(obj);
  }

  getObject(): any {
    return this.myObject;
  }

  getObjectSubject(): BehaviorSubject<any> {
    return this.objectSubject;
  }
  public async addNewToGallery(): Promise<void> {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
    const blob = await fetch(capturedPhoto.webPath!).then((res) => res.blob());
    const file = new File([blob], 'captured_image.png', { type: 'image/png' });
    this.photos.unshift(file);
    this.router.navigate(['selfie/screen2']);
  }
  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
    });
    var imageUrl = image.webPath;
  };
  printCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    this.setLocationStatus(coordinates);

    console.log('Current position:', coordinates);
  };

  getPhoto(data: any) {
    return this.photo;
  }
  ProceedMatch(data: any): Observable<any> {
    let token = localStorage.getItem('nasaTocken');
    let headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(`${this.apiUrl}/verifyCoordinates`, data, {
      headers,
    });
  }

  async checkAndRequestLocationPermission() {
    const permissionStatus = await Geolocation.checkPermissions();

    if (permissionStatus.location === 'granted') {
      console.log('Location permission granted');
      this.printCurrentPosition();
    } else {
      const requestResult = await Geolocation.requestPermissions();

      if (requestResult.location === 'granted') {
        console.log('Location permission granted');
        this.printCurrentPosition();
      } else {
        console.log('Location permission denied');
      }
    }
  }
  getLocationStatus() {
    return this.locationSubject.asObservable();
  }

  setLocationStatus(status: any) {
    console.log('The location is settle ');
    this.locationSubject.next(status);
  }
}
export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}
