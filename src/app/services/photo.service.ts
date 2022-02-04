import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ImageUtilService } from './ ImageUtilService';
import { StorageService } from './storage.service';
import { Observable } from "rxjs";
import { API_CONFIG } from 'src/config/config';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {


  constructor(public http: HttpClient,
    public storageService: StorageService,
    public imageUtilService: ImageUtilService) { }

  getImageFromBucket(id: string): Observable<any> {
    let url = `${API_CONFIG.bukectBaseUrl}/profiles/cp${id}.png`
    return this.http.get(url, { responseType: 'blob' });
  }

  uploadPicture(picture) {
    let token = this.storageService.getLocalUser().token;
    let authHeader = new HttpHeaders ({'Authorization': 'Bearer '+ token});

    let pictureBlod = this.imageUtilService.dataUriToBlob(picture);
    let formData: FormData = new FormData();
    formData.set('file', pictureBlod, 'file.png');
    return this.http.post(`${API_CONFIG.baseUrl}/clientes/imageprofile`, formData,
      {
        'headers': authHeader,
        observe: 'response',
        responseType: 'text'
      });
  }
}