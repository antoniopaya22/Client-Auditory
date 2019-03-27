import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DeviceService } from '../api/device.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { UserService } from '../api/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {


  private filter: FormGroup;
  private size: boolean = false;
  private submitted: boolean = false;
  displayedColumns: string[] = ['Key', 'temp', 'device', 'gps', 'node', 'time'];
  dataSource;

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

// tslint:disable-next-line: max-line-length
    this.service.getDataAdvancedSearch(this.filter.value['filterId'], this.filter.value['filterTemp'], this.filter.value['filterLowerTemp'], this.filter.value['filterGreaterTemp'], this.filter.value['filterTime'], this.filter.value['filterLowerTime'], this.filter.value['filterGreaterTime'], this.filter.value['filterDevice'], this.filter.value['filterNode']).subscribe(res => {
      console.log(res);

      let data = [];

// tslint:disable-next-line: forin
      for (let key in res) {
        console.log(res[key]['Record']['hour']);

// tslint:disable-next-line: radix
        let date = new Date(parseInt(res[key]['Record']['hour']));
        console.log(date);
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
