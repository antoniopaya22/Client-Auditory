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
  displayedColumns: string[] = ['Key', 'temp', 'device', 'gps', 'node', 'time'];
  dataSourceAuditory;
  dataSourceRead;

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
    this.cargarBlockchainData(nodo);
    this.cargarLocalData(nodo);
  }

  cargarBlockchainData(nodo) {
    this.deviceApi.getByNodo(nodo).subscribe(res => {
      let data = [];
      let temp = [];
      for (const key in res) {
        const date = new Date(parseInt(res[key]['Record']['hour']));
        res[key]['Record']['hour'] = date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
        data.push(res[key]);
      }
      temp = data.sort(function(a,b){
        if (parseInt(a.Key.match(/\d+/)[0]) > parseInt(b.Key.match(/\d+/)[0])) {
          return 1;
        }
        else if (parseInt(a.Key.match(/\d+/)[0]) < parseInt(b.Key.match(/\d+/)[0])) {
          return -1;
        }
        return 0;
      });
      this.dataSourceAuditory = new MatTableDataSource(temp);
      } , err => {
      console.log(err.status);
      this.userApi.logout();
      this.router.navigate(['/login'], { replaceUrl: true });
    });
  }

  cargarLocalData(nodo) {
    this.deviceReadApi.getAllData(nodo).then(value => {value.subscribe(res => {
      let data = [];
      for (const key in res) {
        const date = new Date(parseInt(res[key]['hour']));
        res[key]['hour'] = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        data.push(res[key]);
      }
      this.dataSourceRead = new MatTableDataSource(data);
    } , err => {
      console.log(err.status);
    })});
  }

  onSelectChange(selectedValue: any) {
    this.cargarDatos(selectedValue.detail.value);
  }
}
