import { DeviceService } from './../../services/device/device.service';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  private filter: FormGroup;
  public size: boolean;
  public submitted: boolean;
  public displayedColumns: string[] = ['Key', 'temp', 'device', 'gps', 'node', 'time'];
  public dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private formBuilder: FormBuilder, private service: DeviceService, private userApi: UserService, private router: Router) { }

  ngOnInit() {
    if (window.innerWidth > 760) {
      this.size = true;
    }
    this.filter = this.formBuilder.group({
      filterId: [''],
      filterTemp: [''],
      filterLowerTemp: [''],
      filterGreaterTemp: [''],
      filterTime: [''],
      filterLowerTime: [''],
      filterGreaterTime: [''],
      filterDevice: [''],
      filterNode: ['']
    });
  }

  search() {
    this.service.getDataAdvancedSearch(
      this.filter.value['filterId'],
      this.filter.value['filterTemp'],
      this.filter.value['filterLowerTemp'],
      this.filter.value['filterGreaterTemp'],
      this.filter.value['filterTime'],
      this.filter.value['filterLowerTime'],
      this.filter.value['filterGreaterTime'],
      this.filter.value['filterDevice'],
      this.filter.value['filterNode']
    ).subscribe(res => {

      let data = [];

      for (let key in res) {
        let date = new Date(parseInt(res[key]['Record']['hour']));
        res[key]['Record']['hour'] = date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
        data.push(res[key]);
      }


      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.submitted = true;
    },
      err => {

        console.log(err.status);
        this.userApi.logout();
        this.router.navigate(['/login'], { replaceUrl: true });
      });
  }

  back() {
    this.submitted = false;
  }

}
