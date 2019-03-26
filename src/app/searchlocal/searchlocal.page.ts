import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RestClientService } from '../api/rest-client.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
@Component({
  selector: 'app-searchlocal',
  templateUrl: './searchlocal.page.html',
  styleUrls: ['./searchlocal.page.scss'],
})
export class SearchlocalPage implements OnInit {

  private dataDate: FormGroup;
  private dataId: FormGroup;
  private size: boolean = false;
  displayedColumns: string[] = ['Key', 'temp', 'device', 'gps', 'time'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  private submitted: boolean = false;
  constructor(private formBuilder: FormBuilder, private service: RestClientService) { }

  ngOnInit() {
    if (window.innerWidth > 760) {
      this.size = true;
    }
    this.dataDate = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
    this.dataId = this.formBuilder.group({
      idData: ['', Validators.required]
    });
  }

  getDataBW() {

    this.service.getDataBetweenDates(this.dataDate.value["startDate"], this.dataDate.value["endDate"]).subscribe(res => {
      console.log(res);
      console.log(res);
      this.submitted = true;
      let data = [];

      for (let key in res) {
        console.log(res[key]['hour']);

        let date = new Date(parseInt(res[key]['hour']));
        console.log(date);
        res[key]['hour'] = date.toLocaleDateString() + " " + date.toLocaleTimeString()
        data.push(res[key]);
      }


      this.dataDate.setValue({
        startDate: ' ',
        endDate: ' '
      });
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.submitted = true;
    })
  }

  getDataId() {
    this.service.getDataById(this.dataId.value["idData"]).subscribe(res => {
      console.log(res);
      this.submitted = true;
      let data = [];

      for (let key in res) {
        console.log(res[key]['hour']);

        let date = new Date(parseInt(res[key]['hour']));
        console.log(date);
        res[key]['hour'] = date.toLocaleDateString() + " " + date.toLocaleTimeString()
        data.push(res[key]);
      }


      this.dataId.setValue({
        idData: " "
      });
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.submitted = true;
    })

  }

  back() {
    this.submitted = false;
  }

}
