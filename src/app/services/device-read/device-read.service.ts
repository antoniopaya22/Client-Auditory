import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeviceReadService {


  constructor(
    private http: HttpClient) {
  }


  getAllData(nodo: string) {
    const url = this.getUrlByNodo(nodo);
    return this.getToken(url).then(value => {
      const uri = `${url}/data`;
      const httpHeaders = new HttpHeaders({
        'Content-Type': 'text/plain',
        'Authorization': `${value}`
      });
      return this.http.get(uri, { headers: httpHeaders });
    });
  }

  getToken(url: string) {
    const data = {
      userName: environment.userRead,
      password: environment.passwordRead
    };
    const uri = `${url}/login`;
    const HTTPOptions = {
      headers: new HttpHeaders({
        'Accept': 'text/html, application/xhtml+xml, */*',
      }),
      'responseType': 'text' as 'text'
    }
    return this.http.post(uri, data, HTTPOptions).toPromise();
  }

  getUrlByNodo(nodo: string) {
    switch (nodo) {
      case 'peer0.asturias.antonio.com':
        return environment.ipReadAsturias;
      case 'peer0.chicago.antonio.com':
        return environment.ipReadChicago;
      case 'peer0.brasil.antonio.com':
        return environment.ipReadBrasil;
      default:
      return environment.ipReadAsturias;
    }
  }

}
