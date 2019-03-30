import { Component } from '@angular/core';
import leaflet from 'leaflet';
import { Chart } from 'chart.js';
import { DeviceService } from '../api/device.service';
import { Platform,MenuController } from '@ionic/angular';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private map: any;
  public chart = [];
  private greenIcon;
  private subida;
  private sube: boolean;

  public devices = [];

  constructor(
    private devicedata: DeviceService,
    private platform: Platform,
    private menuCtrl: MenuController) { }

  ionViewDidEnter() {
    this.greenIcon = leaflet.icon({
      iconUrl: '../../assets/icon/marker-icon.png',
      shadowUrl: '../../assets/icon/marker-shadow.png',
    });
    this.loadData();
    this.tempData("asturias_device");
  }

  startAnimationForLineChart(chart){
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function(data) {
      if(data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if(data.type === 'point') {
            seq++;
            data.element.animate({
              opacity: {
                begin: seq * delays,
                dur: durations,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
    });
    seq = 0;
  };

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
  }


  tempData(device) {

    this.devicedata.getByDevice(device).subscribe(result => {

      let data = [];
      let date = [];

      Object.keys(result).some(function (key) {
        data.push(result[key]['Record']['temperature']);
        date.push(result[key]['Record']['hour']);
        return data.length >= 5;

      });
      var valnuevo = parseInt(data[data.length-1])+100;
      var valViejo = parseInt(data[0])+100;
      this.subida = (Math.abs((valViejo)-(valnuevo))/valnuevo)*100;
      this.sube = valnuevo >= valViejo ? true : false;

      const dataDailySalesChart: any = {
        labels: date,
        series: [data]
      };
  
      const optionsDailySalesChart: any = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            low: 0,
            high: 50,
            chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
        }
  
      var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);
  
      this.startAnimationForLineChart(dailySalesChart);
    });

  }

  onSelectChange(selectedValue: any) {
    this.tempData(selectedValue.detail.value);
  }

  esMovil(){
    if(this.platform.is('mobileweb') || this.platform.is('mobile')) {
      return true;
    } else {
      return false;
    }
  }
}
