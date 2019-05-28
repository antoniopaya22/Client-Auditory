import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserService } from '../user/user.service';

/**
 * Device Service Injectable
 */
@Injectable({
    providedIn: 'root'
})
export class DeviceService {

    APIEndPoint: string;

    /**
   * Constructor
   * @param {HttpClient} http
   * @param {UserService} userApi
   */
    constructor(
        private http: HttpClient,
        private userApi: UserService) {
        this.APIEndPoint = environment.apiendpoint;
    }

    /**
     * Obtiene los ultimos datos
     * @return Promise
     */
    getLatestData() {
        const uri = `${this.APIEndPoint}/data/devices`;
        const httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `${this.userApi.getToken()}`
        });
        return this.http.get(uri, { headers: httpHeaders });
    }

    /**
     * Obtiene todos los datos
     * @return Promise
     */
    getAllData() {
        const consulta = {
            "selector": {},
            "sort": [
                {
                    "hour": "asc"
                }
            ]
        }
        const uri = `${this.APIEndPoint}/data/query`;
        const httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `${this.userApi.getToken()}`
        });
        return this.http.post(uri, consulta, { headers: httpHeaders });

    }

    /**
     * Obtiene el historial de un dato
     * @param id
     * @return Promise
     */
    getHistoryData(id: string): any {
        const uri = `${this.APIEndPoint}/data/history/` + id;
        const httpHeaders = new HttpHeaders({
            'Content-Type': 'text/plain',
            'Authorization': `${this.userApi.getToken()}`
        });
        return this.http.get(uri, { headers: httpHeaders });
    }

    /**
     * Obtiene los datos de un device
     * @param device
     * @return Promise
     */
    getByDevice(device) {
        const uri = `${this.APIEndPoint}/data?device=${device}`;
        const httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `${this.userApi.getToken()}`
        });
        return this.http.get(uri, { headers: httpHeaders })
    }

    /**
     * Obtiene los datos de un nodo
     * @param nodo
     * @return Promise
     */
    getByNodo(nodo) {
        const uri = `${this.APIEndPoint}/data?node=${nodo}`;
        const httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `${this.userApi.getToken()}`
        });
        return this.http.get(uri, { headers: httpHeaders })
    }

    /**
     * Obtiene un dato por id
     * @param id
     * @return Promise
     */
    getByID(id) {
        const uri = `${this.APIEndPoint}/${id}`;
        const httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `${this.userApi.getToken()}`
        });
        return this.http.get(uri, { headers: httpHeaders })
    }

    /**
     * Obtiene los datos por lugar
     * @param place
     * @return Promise
     */
    getByPlace(place) {
        const uri = `${this.APIEndPoint}/${place}`;
        const httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `${this.userApi.getToken()}`
        });
        return this.http.get(uri, { headers: httpHeaders })
    }


    /**
     * Obtiene los datos por busqueda avanzada
     * @param id
     * @param temp
     * @param lowTemp
     * @param greatTemp
     * @param device
     * @param node
     * @return Promise
     */
    getDataAdvancedSearch(
        id: String,
        temp: string,
        lowTemp: String,
        greatTemp: String,
        device: String,
        node: String) {
        const uri = `${this.APIEndPoint}/data?Key=${id}&temperature=${temp}&lowerTemperature=${lowTemp}&greaterTemperature=${greatTemp}&device=${device}&node=${node}`;
        const httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `${this.userApi.getToken()}`
        });
        return this.http.get(uri, { headers: httpHeaders })
    }


    compareData(dato, localData): boolean {
        for (var i = 0; i < localData.length; i++) {
            if (JSON.stringify(dato) === JSON.stringify(localData[i])) return false;
        }
        return true;
    }

}
