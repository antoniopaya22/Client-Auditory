import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  APIEndPoint: string;

  constructor(
    private http: HttpClient,
    private userApi: UserService) {
    this.APIEndPoint = environment.apiendpoint;
  }

  getLatestData() {
    const uri = `${this.APIEndPoint}/data/devices`;
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.userApi.getToken()}`
    });
    return this.http.get(uri, { headers: httpHeaders });
  }

  getAllData() {
    const uri = `${this.APIEndPoint}/data`;
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'text/plain',
      'Authorization': `${this.userApi.getToken()}`
    });
    return this.http.get(uri, { headers: httpHeaders });

  }

  getHistoryData(id: string): any {
    const uri = `${this.APIEndPoint}/data/device/`+id;
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'text/plain',
      'Authorization': `${this.userApi.getToken()}`
    });
    return this.http.get(uri, { headers: httpHeaders });
  }

  getByDevice(device) {
    const uri = `${this.APIEndPoint}/data?device=${device}`;
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.userApi.getToken()}`
    });
    return this.http.get(uri, { headers: httpHeaders })
  }

  getByNodo(nodo) {
    const uri = `${this.APIEndPoint}/data?node=${nodo}`;
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.userApi.getToken()}`
    });
    return this.http.get(uri, { headers: httpHeaders })
  }

  getByID(id) {
    const uri = `${this.APIEndPoint}/${id}`;
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.userApi.getToken()}`
    });
    return this.http.get(uri, { headers: httpHeaders })
  }

  getByPlace(place) {
    const uri = `${this.APIEndPoint}/${place}`;
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.userApi.getToken()}`
    });
    return this.http.get(uri, { headers: httpHeaders })
  }


  getDataAdvancedSearch(
    id: String,
    temp: string,
    lowTemp: String,
    greatString: String,
    time: String,
    lowTime: String,
    greatTime: String,
    device: String,
    node: String) {
    const uri = `${this.APIEndPoint}/data?Key=${id}&temperature=${temp}&lowerTemperature=${lowTemp}&greaterTemperature=${greatString}&hour=${time}&lowerHour=${lowTime}&greaterHour=${greatTime}&device=${device}&node=${node}`;
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.userApi.getToken()}`
    });
    return this.http.get(uri, { headers: httpHeaders })
  }

}
