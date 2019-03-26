import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RestClientService {


  constructor(private httpClient: HttpClient) { }



  getAllData() {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.get(`${environment.ipServer}/data`, { headers: httpHeaders });

  }

  getDataBetweenDates(startDate: String, endDate: String) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.get(`${environment.ipServer}/specificdata?startDate=${startDate}&endDate=${endDate}`, { headers: httpHeaders });

  }

  getDataById(id: Number) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpClient.get(`${environment.ipServer}/data/${id}`, { headers: httpHeaders });
  }

}
