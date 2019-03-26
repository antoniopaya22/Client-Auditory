import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  APIEndPoint;

  constructor(private http: HttpClient, private userApi: UserService) {
    this.APIEndPoint = environment.apiendpoint;
  }

  getTempData() {
     const httpHeaders = new HttpHeaders({
       'Content-Type': 'application/json'
     });
     return this.http.get("http://samples.openweathermap.org/data/2.5/history/city?q=Warren,OH&appid=e46019d6bdee7fc775514f6818afe915")
 
   /* const uri = `${this.APIEndPoint}/data?id=${id}`;
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.userApi.getToken()}`
    });
    return this.http.get(uri,{ headers: httpHeaders });*/
  }

  getAllData() {

    const uri = `${this.APIEndPoint}/data`;
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.userApi.getToken()}`
    });
    return this.http.get(uri, { headers: httpHeaders });

  }

  getByID(id) {
    const uri = `${this.APIEndPoint}/${id}`;
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': `Bearer ${this.getToken()}`
    });
    return this.http.get(uri, { headers: httpHeaders })
  }

  getByPlace(place) {
    const uri = `${this.APIEndPoint}/${place}`;
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': `Bearer ${this.getToken()}`
    });
    return this.http.get(uri, { headers: httpHeaders })
  }


  getDataAdvancedSearch(id: String, temp: string, lowTemp: String, greatString: String, time: String, lowTime: String, greatTime: String, device: String, node: String) {
    const uri = `${this.APIEndPoint}/data?id=${id}&temp=${temp}&lowerTemp=${lowTemp}&greaterTemp=${greatString}&time=${time}&lowerTime=${lowTime}&greaterTime=${greatTime}&device=${device}&node=${node}`;
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.userApi.getToken()}`
    });
    return this.http.get(uri, { headers: httpHeaders })
  }

}
