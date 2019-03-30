import { DeviceReadService } from './../api/device-read.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, MatTableDataSource } from '@angular/material';
import { MenuController } from '@ionic/angular';
import { DeviceService } from '../api/device.service';
import { UserService } from '../api/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.page.html',
  styleUrls: ['./compare.page.scss'],
})
export class ComparePage implements OnInit {

  size: boolean = false;
  displayedColumns: string[] = ['Key', 'temp', 'device', 'gps', 'node', 'time'];
  dataSourceAuditory;
  dataSourceRead;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private deviceApi: DeviceService,
    private deviceReadApi: DeviceReadService,
    private userApi: UserService,
    private router:Router) {
  }

  ngOnInit() {
    this.cargarDatos("peer0.asturias.antonio.com");
  }

  cargarDatos(nodo){
    this.deviceApi.getAllData().subscribe(res => {
      let data = [];
      let temp = [];
// tslint:disable-next-line: forin
      for (const key in res) {
// tslint:disable-next-line: radix
        const date = new Date(parseInt(res[key]['Record']['hour']));
        res[key]['Record']['hour'] = date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
        data.push(res[key]);
      }
      temp = data.filter(x => x.Record.node == nodo).sort(function(a,b){
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

    this.deviceReadApi.getAllData(nodo).then(value => {value.subscribe(res => {
      let data = [];
// tslint:disable-next-line: forin
      for (const key in res) {
// tslint:disable-next-line: radix
        const date = new Date(parseInt(res[key]['hour']));
        res[key]['hour'] = date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
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
