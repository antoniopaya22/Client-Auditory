import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceReadService {


  constructor(
    private http: HttpClient,
    private userApi: UserService) {
  }


  getAllData(nodo) {
    var url = this.getUrlByNodo(nodo);
    var uri;
    var httpHeaders;
    return this.getToken(url).then(value => {
      uri = `${url}/data`;
      httpHeaders = new HttpHeaders({
        'Content-Type': 'text/plain',
        'Authorization': `${value}`
      });
      console.log(value);
      return this.http.get(uri, { headers: httpHeaders });
    });
  }

  getToken(url){
    const data = {
      userName: 'user',
      password: 'user'
    };
    const uri = `${url}/login`;
    var HTTPOptions = {
      headers: new HttpHeaders({
        'Accept': 'text/html, application/xhtml+xml, */*',
      }),
      'responseType': 'text' as 'text'
    }
    return this.http.post(uri, data, HTTPOptions).toPromise();
  }

  getUrlByNodo(nodo){
    switch (nodo) {
      case "peer0.asturias.antonio.com":
        return "http://156.35.163.141:3000";
      case "peer0.chicago.antonio.com":
        return "http://156.35.163.143:3000";
      case "peer0.brasil.antonio.com":
        return "http://156.35.163.142:3000";
      default:
      return "http://156.35.163.141:3000";
    }
  }

}
