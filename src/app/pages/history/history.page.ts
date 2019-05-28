import { UserService } from './../../services/user/user.service';
import { DeviceService } from './../../services/device/device.service';
import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MatPaginator, MatPaginatorModule, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

/**
 * History data page
 */
@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  displayedColumns: string[] = ['transid', 'timestamp', 'temp', 'device', 'gps', 'node', 'time' ];
  dataSource;
  id: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
   /**
   * Constructor
   * @param {DeviceService} deviceApi
   * @param {Router} router
   * @param {UserService} userApi
   * @param {ActivatedRoute} route
   */
  constructor(
    private route: ActivatedRoute,
    private deviceApi: DeviceService,
    private userApi: UserService,
    private router:Router
  ) { }

  /**
   * OnInit
   */
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    
    this.deviceApi.getHistoryData(this.id).subscribe(res => {
      let data = [];
      for (let key in res) {
        let date = new Date(parseInt(res[key]['Value']['hour']));
        res[key]['Value']['hour'] = date.toLocaleDateString() + " " + date.toLocaleTimeString();
        data.push(res[key]);
      }

      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    }
      , err => {

        console.log(err.status);
        this.userApi.logout();
        this.router.navigate(['/login'], { replaceUrl: true });
      });


  }

}
