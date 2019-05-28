import { DeviceReadService } from './../../services/device-read/device-read.service';
import { UserService } from './../../services/user/user.service';
import { DeviceService } from './../../services/device/device.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

/**
 * Compare data page
 */
@Component({
    selector: 'app-compare',
    templateUrl: './compare.page.html',
    styleUrls: ['./compare.page.scss'],
})
export class ComparePage implements OnInit {

    size: boolean;
    displayedColumns: string[] = ['id', 'temperature', 'device', 'gps', 'node', 'hour'];
    dataSourceAuditory;
    dataSourceRead;
    dataRead = [];
    dataAuditory = [];
    todos;
    todosLocal;
    
    @ViewChild(MatPaginator) paginator: MatPaginator;
    /**
     * Constructor
     * @param {DeviceService} deviceApi
     * @param {Router} router
     * @param {UserService} userApi
     * @param {DeviceReadService} deviceReadApi
     */
    constructor(
        private deviceApi: DeviceService,
        private deviceReadApi: DeviceReadService,
        private userApi: UserService,
        private router: Router) {
    }

    /**
     * OnInit
     */
    ngOnInit() {
        this.cargarDatos('peer0.asturias.antonio.com');
    }

    /**
     * Carga los datos en las tablas
     * @param nodo, nodo del que cargar los datos
     */
    cargarDatos(nodo) {
        this.cargarLocalData(nodo);
        this.cargarBlockchainData(nodo);
    }

    /**
     * Carga los datos de la blockchain
     * @param nodo, nodo del que cargar los datos
     */
    cargarBlockchainData(nodo) {
        this.deviceApi.getByNodo(nodo).subscribe(res => {
            let data = [];
            let temp = [];
            for (const key in res) {
                const date = new Date(parseInt(res[key]['Record']['hour']));
                res[key]['Record']['hour'] = date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
                var object = {
                    id : res[key].Key,
                    device: res[key].Record.device,
                    gps: res[key].Record.gps,
                    hour: res[key].Record.hour,
                    node: res[key].Record.node,
                    temperature: res[key].Record.temperature,
                }
                data.push(object);
            }
            temp = data.sort(function (a, b) {
                if (parseInt(a.id.match(/\d+/)[0]) > parseInt(b.id.match(/\d+/)[0])) {
                    return 1;
                }
                else if (parseInt(a.id.match(/\d+/)[0]) < parseInt(b.id.match(/\d+/)[0])) {
                    return -1;
                }
                return 0;
            });
            this.todos = data;
            this.dataAuditory = data;
            this.dataSourceAuditory = new MatTableDataSource(temp);
        }, err => {
            console.log(err.status);
            this.userApi.logout();
            this.router.navigate(['/login'], { replaceUrl: true });
        });
    }

    /**
     * Carga los datos de la bbdd local
     * @param nodo, nodo del que cargar los datos
     */
    cargarLocalData(nodo) {
        this.deviceReadApi.getAllData(nodo).then(value => {
            value.subscribe(res => {
                let data = [];
                let temp = [];
                for (const key in res) {
                    const date = new Date(parseInt(res[key]['hour']));
                    res[key]['hour'] = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
                    var object = {
                        id: res[key].id,
                        device: res[key].device,
                        gps: res[key].gps,
                        hour: res[key].hour,
                        node: nodo,
                        temperature: res[key].temperature
                    };
                    data.push(object);
                }
                temp = data.sort(function (a, b) {
                    if (parseInt(a.id.match(/\d+/)[0]) > parseInt(b.id.match(/\d+/)[0])) {
                        return 1;
                    }
                    else if (parseInt(a.id.match(/\d+/)[0]) < parseInt(b.id.match(/\d+/)[0])) {
                        return -1;
                    }
                    return 0;
                });
                this.todosLocal = data;
                this.dataRead = data;
                this.dataSourceRead = new MatTableDataSource(temp);
            }, err => {
                console.log(err.status);
            })
        });
    }

    /**
     * Comprueba si un dato es diferente con la blockchain
     * @param dato, dato a comprobar
     */
    isDiferente(dato) {
        if (this.deviceApi.compareData(dato, this.dataRead))
            return true;
    }

    /**
     * Comprueba si un dato es diferente con la bbdd
     * @param dato, dato a comprobar
     */
    isDiferenteLocal(dato) {
        if (this.deviceApi.compareData(dato, this.dataAuditory))
            return true;
    }

    
    /**
     * Evento de cambio de valores en nodos
     * @param selectedValues, valor seleccionado
     */
    onSelectChange(selectedValue: any) {
        this.cargarDatos(selectedValue.detail.value);
    }

    
    /**
     * Evento de cambio de valores en etiquetas
     * @param selectedValues, valores seleccionados
     */
    onLabelsDataChange(selectedValues: any) {
        const seleccionados = selectedValues.detail.value;
        this.displayedColumns = seleccionados;
    }

    /**
     * Evento de cambio de valores en discrepancias
     * @param selectedValues, valores seleccionados
     */
    onDatosDataChange(selectedValues: any) {
        const seleccionado = selectedValues.detail.value;
        if (seleccionado === 'Discrepancias'){
            var temp1 = this.dataAuditory.filter(x => this.isDiferente(x));
            var temp2 = this.dataRead.filter(x => this.isDiferenteLocal(x));
            this.dataAuditory = temp1;
            this.dataRead = temp2;
            this.dataSourceAuditory = new MatTableDataSource(this.dataAuditory);
            this.dataSourceRead = new MatTableDataSource(this.dataRead);
        }else{
            this.dataAuditory = this.todos;
            this.dataSourceAuditory = new MatTableDataSource(this.dataAuditory);
            this.dataRead = this.todosLocal;
            this.dataSourceRead = new MatTableDataSource(this.dataRead);
        }
    }

    /**
     * Muestra las columnas de la tabla
     * @param col, columna a mostrar
     */
    mostrarColumna(col: string) {
        return this.displayedColumns.indexOf(col) > -1;
    }
}
