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

  map: any;
  public chart = [];
  greenIcon;

  constructor(private devicedata: DeviceService) { }

  ionViewDidEnter() {
    this.greenIcon = leaflet.icon({
      iconUrl: '../../assets/icon/marker-icon.png',
      shadowUrl: '../../assets/icon/marker-shadow.png',
    });

    this.loadmap();
    this.tempData();
  }

  loadmap() {

    this.map = leaflet.map("map").fitWorld().zoomIn();


    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'www.tphangout.com',
      maxZoom: 18
    }).addTo(this.map);

    /*this.map.setView([52.847726, -45.717249], 0);
    this.map.setZoom(1);*/
    leaflet.marker([43.365912, -5.852597], { icon: this.greenIcon }).addTo(this.map);
  }


  tempData() {
   
    this.devicedata.getTempData()
      .subscribe(res => {
        console.log(res);
        let temp_max = res['list'].map(res => res.main.temp_max);
        let temp_min = res['list'].map(res => res.main.temp_min);
        let alldates = res['list'].map(res => res.dt)

        let weatherDates = []
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
                borderColor: "#3cba9f",
                fill: false
              },
              {
                data: temp_min,
                borderColor: "#ffcc00",
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
      })
  }
}
