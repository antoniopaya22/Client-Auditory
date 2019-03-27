import { Component } from '@angular/core';
import leaflet from 'leaflet';
import { Chart } from 'chart.js';
import { DeviceService } from '../api/device.service';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private map: any;
  public chart = [];
  private greenIcon;
  private devices = [];

  constructor(private devicedata: DeviceService) { }

  ionViewDidEnter() {
    this.greenIcon = leaflet.icon({
      iconUrl: '../../assets/icon/marker-icon.png',
      shadowUrl: '../../assets/icon/marker-shadow.png',
    });
    this.chart = new Chart('canvas', {});
    this.loadData();

  }

  loadData() {
    this.devices = [];
    this.devicedata.getLatestData().subscribe(res => {
      for (let key in res) {
        this.devices.push(key);
      }


      this.loadmap(res);

    })
  }

  loadmap(res) {

    this.map = leaflet.map('map').fitWorld().zoomIn();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'www.tphangout.com',
      maxZoom: 18
    }).addTo(this.map);

    for (let key in res) {
      if (res.hasOwnProperty(key)) {


        let long = res[key]['Record']['gps'].split(';')[0];
        let lat = res[key]['Record']['gps'].split(';')[1];

        //leaflet.marker([43.365912, -5.852597], { icon: this.greenIcon }).addTo(this.map);
        leaflet.marker([lat, long], { icon: this.greenIcon }).addTo(this.map);
      }
    }
    /*this.map.setView([52.847726, -45.717249], 0);
    this.map.setZoom(1);*/
  }


  tempData(device) {

    this.devicedata.getByDevice(device).subscribe(result => {

      let data = [];
      let date = [];


      Object.keys(result).some(function (key) {
        console.log(key, result[key]);
        data.push(result[key]['Record']['temperature']);
        date.push(result[key]['Record']['hour']);
        return data.length >= 4;

      });

      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: date,
          datasets: [{
            data: data,
            borderColor: '#fd7e14',
            fill: true
          }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
    });

    /*
        this.devicedata.getTempData()
          .subscribe(res => {
            console.log(res);
            let temp_max = res['list'].map(res => res.main.temp_max);
            let temp_min = res['list'].map(res => res.main.temp_min);
            let alldates = res['list'].map(res => res.dt)
    
            let weatherDates = [];
            alldates.forEach((res) => {
              let jsdate = new Date(res * 1000)
              weatherDates.push(jsdate.toLocaleTimeString('es', { year: 'numeric', month: 'numeric', day: 'numeric' }))
            })
    
            this.chart = new Chart('canvas', {
              type: 'line',
              data: {
                labels: weatherDates,
                datasets: [
                  {
                    data: temp_max,
                    borderColor: '#3cba9f',
                    fill: false
                  },
                  {
                    data: temp_min,
                    borderColor: '#ffcc00',
                    fill: false
                  },
                ]
              },
              options: {
                legend: {
                  display: false
                },
                scales: {
                  xAxes: [{
                    display: true
                  }],
                  yAxes: [{
                    display: true
                  }],
                }
              }
            });
          })*/
  }


  onSelectChange(selectedValue: any) {
    console.log('Selected', selectedValue.detail.value);
    this.tempData(selectedValue.detail.value);
  }
}
