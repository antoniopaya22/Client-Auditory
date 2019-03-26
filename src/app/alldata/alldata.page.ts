import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, MatTableDataSource } from '@angular/material';
import { MenuController } from '@ionic/angular';
import { DeviceService } from '../api/device.service';


@Component({
  selector: 'app-alldata',
  templateUrl: './alldata.page.html',
  styleUrls: ['./alldata.page.scss'],
})
export class AlldataPage implements OnInit {

  size: boolean = false;
  //displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  displayedColumns: string[] = ['Key', 'temp', 'device', 'gps', 'node', 'time'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private deviceApi: DeviceService) {


  }

  ngOnInit() {

    if (window.innerWidth > 760) {
      this.size = true;
    }

    this.deviceApi.getAllData().subscribe(res => {
      let data = [];

      for (let key in res) {
        console.log(res[key]['Record']['hour']);

        let date = new Date(parseInt(res[key]['Record']['hour']));
        console.log(date);
        res[key]['Record']['hour'] = date.toLocaleDateString() + " " + date.toLocaleTimeString()
        data.push(res[key]);
      }


      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    }
      , err => {
        console.log(err);
      });


  }

}
