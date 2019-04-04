import { DeviceReadService } from './../../services/device-read/device-read.service';
import { UserService } from './../../services/user/user.service';
import { DeviceService } from './../../services/device/device.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

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
    
    @ViewChild(MatPaginator) paginator: MatPaginator;
    constructor(
        private deviceApi: DeviceService,
        private deviceReadApi: DeviceReadService,
        private userApi: UserService,
        private router: Router) {
    }

    ngOnInit() {
        this.cargarDatos('peer0.asturias.antonio.com');
    }

    cargarDatos(nodo) {
        this.cargarLocalData(nodo);
        this.cargarBlockchainData(nodo);
    }

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
            this.dataAuditory = data;
            this.dataSourceAuditory = new MatTableDataSource(temp);
        }, err => {
            console.log(err.status);
            this.userApi.logout();
            this.router.navigate(['/login'], { replaceUrl: true });
        });
    }

    cargarLocalData(nodo) {
        this.deviceReadApi.getAllData(nodo).then(value => {
            value.subscribe(res => {
                let data = [];
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
                    }
                    data.push(object);
                }
                this.dataRead = data;
                this.dataSourceRead = new MatTableDataSource(data);
            }, err => {
                console.log(err.status);
            })
        });
    }

    isDiferente(dato) {
        if (this.deviceApi.compareData(dato, this.dataRead))
            return true;
    }

    onSelectChange(selectedValue: any) {
        this.cargarDatos(selectedValue.detail.value);
    }

    onLabelsDataChange(selectedValues: any) {
        const seleccionados = selectedValues.detail.value;
        this.displayedColumns = seleccionados;
    }

    mostrarColumna(col: string) {
        return this.displayedColumns.indexOf(col) > -1;
    }
}
