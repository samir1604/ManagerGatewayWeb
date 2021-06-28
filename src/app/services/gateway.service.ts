import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Observable } from 'rxjs';
import { ResponseHttp } from '../models/response-http';
import { Gateway } from '../models/gateway';

const HttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class GatewayService {
  base_url: string = environment.base_url;
  url: string = `${this.base_url}/api/gateway`; //'http://localhost:5000/api/gateway';
  activeGateway: Gateway = { name: '', address: ''}
  constructor(private _http: HttpClient) { }

  get$(): Observable<ResponseHttp> {
    return this._http.get<ResponseHttp>(this.url);
  }

  add$(gateway: Gateway): Observable<ResponseHttp> {
    return this._http.post<ResponseHttp>(this.url, gateway, HttpOptions);
  }

  del$(usn: string): Observable<ResponseHttp> {
    return this._http.delete<ResponseHttp>(this.url + `/${usn}`);
  }
}
