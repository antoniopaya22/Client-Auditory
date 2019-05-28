import { UserService } from './../../services/user/user.service';
import { DeviceService } from './../../services/device/device.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

/**
 * All data page
 */
@Component({
  selector: 'app-alldata',
  templateUrl: './alldata.page.html',
  styleUrls: ['./alldata.page.scss'],
})
export class AlldataPage implements OnInit {

  size: boolean;
  displayedColumns: string[] = ['Key', 'temp', 'device', 'gps', 'node', 'time', 'history'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
   /**
   * Constructor
   * @param {DeviceService} deviceApi
   * @param {Router} router
   * @param {UserService} userApi
   */
  constructor(
    private deviceApi: DeviceService,
    private userApi: UserService,
    private router: Router) {
  }

  /**
   * OnInit
   */
  ngOnInit() {
    if (window.innerWidth > 760) {
      this.size = true;
    }

    this.deviceApi.getAllData().subscribe(res => {
      let data = [];

      for (let key in res) {
        let date = new Date(parseInt(res[key]['Record']['hour']));
        res[key]['Record']['hour'] = date.toLocaleDateString() + " " + date.toLocaleTimeString()
        data.push(res[key]);
      }
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    } , err => {
      console.log(err.status);
      this.userApi.logout();
      this.router.navigate(['/login'], { replaceUrl: true });
    });


  }

  /**
   * Redirige a la pagina de historial
   * @param id, id del dato sobre el que buscar su historial
   */
  history(id){
    this.router.navigate([`/history/${id}`], { replaceUrl: true });
  }

}
