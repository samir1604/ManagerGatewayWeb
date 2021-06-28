import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Device } from '../models/device';
import { ResponseHttp } from '../models/response-http';
import { environment } from '../../environments/environment';

const HttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  base_url: string = environment.base_url;
  url: string = `${this.base_url}/api/device`; //'http://localhost:5000/api/device';

  constructor(private _http: HttpClient) { }

  get$(usn: string): Observable<ResponseHttp> {
    return this._http.get<ResponseHttp>(this.url + `/${usn}`);
  }

  remove$(id: number): Observable<ResponseHttp> {
    return this._http.delete<ResponseHttp>(this.url + `/${id}`);
  }

  add$(device: Device): Observable<ResponseHttp> {
    return this._http.post<ResponseHttp>(this.url, device, HttpOptions);
  }
}
