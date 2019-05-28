import { Injectable } from '@angular/core';
//import { HttpClient } from 'selenium-webdriver/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

/**
 * User Service Injectable
 */
@Injectable({
    providedIn: 'root'
})
export class UserService {

    APIEndPoint;

    /**
   * Constructor
   * @param {HttpClient} http
   */
    constructor(private http: HttpClient) {
        this.APIEndPoint = environment.apiendpoint;
    }

    /**
     * Establece el token de sesion
     * @param variable token de sesion
     */
    setToken(variable) {
        localStorage.setItem('token', variable);
    }

    /**
     * Elimina el token de sesion
     */
    removeToken() {
        localStorage.removeItem('token');
    }

    /**
     * Devuelve el token de sesion
     * @return Token
     */
    getToken() {
        return localStorage.getItem('token');
    }

    /**
     * Devuelve true si el usuario esta logueado
     * @return boolean
     */
    isLoggedIn() {
        return this.getToken() !== null;
    }

    /**
     * Inicia sesion
     * @param data
     * @return Promise
     */
    login(data) {

        const uri = `${this.APIEndPoint}/login`;
        var HTTPOptions = {
            headers: new HttpHeaders({
                'Accept': 'text/html, application/xhtml+xml, */*',
            }),
            'responseType': 'text' as 'text'
        }
        return this.http.post(uri, data, HTTPOptions);
    }

    /**
     * Cierra sesion
     */
    logout() {

        this.removeToken();
        return;
    }


}
