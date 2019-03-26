import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DeviceService } from '../api/device.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';

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

  constructor(private formBuilder: FormBuilder, private service: DeviceService) { }

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

    this.service.getDataAdvancedSearch(this.filter.value["filterId"], this.filter.value["filterTemp"], this.filter.value["filterLowerTemp"], this.filter.value["filterGreaterTemp"], this.filter.value["filterTime"], this.filter.value["filterLowerTime"], this.filter.value["filterGreaterTime"], this.filter.value["filterDevice"], this.filter.value["filterNode"]).subscribe(res => {
      console.log(res);

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
      this.submitted = true;
    })
  }

  back(){
    this.submitted=false;
  }

}
