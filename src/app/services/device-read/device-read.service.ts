import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

/**
 * Device Read Service Injectable
 */
@Injectable({
  providedIn: 'root'
})
export class DeviceReadService {

  /**
   * Constructor
   * @param {HttpClient} http
   */
  constructor(
    private http: HttpClient) {
  }


  /**
     * Obtiene todos los datos
     * @return Promise
     */
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

  /**
   * Obtiene el token de sesion
   * @param url
   * @return Promise
   */
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

  /**
   * Obtiene la direccion de la api dado un nodo
   * @param nodo
   * @return ipApi
   */
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
