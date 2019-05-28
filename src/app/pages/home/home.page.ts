import { DeviceService } from './../../services/device/device.service';
import { Component } from '@angular/core';
import leaflet from 'leaflet';
import { Platform } from '@ionic/angular';
import * as Chartist from 'chartist';

/**
 * Home page
 */
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private map: any;
  public chart = [];
  private greenIcon;
  public subida;
  public sube: boolean;

  public devices = [];

  /**
   * Constructor
   * @param {DeviceService} deviceApi
   * @param {Platform} platform
   */
  constructor(
    private devicedata: DeviceService,
    private platform: Platform) { }

    
  /**
   * OnInit
   */
  ionViewDidEnter() {
    this.greenIcon = leaflet.icon({
      iconUrl: '../../assets/icon/marker-icon.png',
      shadowUrl: '../../assets/icon/marker-shadow.png',
    });
    this.loadData();
    this.tempData("asturias_device");
  }

  /**
   * Comienza la animacion de la grafica
   * @param char, grafica
   */
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

  /**
   * Carga los datos en las graficas
   */
  loadData() {
    this.devices = [];
    this.devicedata.getLatestData().subscribe(res => {
      for (let key in res) {
        this.devices.push(key);
      }
      this.loadmap(res);
    })
  }

  /**
   * Carga el mapa con sus datos
   * @param res
   */
  loadmap(res) {

    this.map = leaflet.map('map').fitWorld().zoomIn();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'www.antoniopg.tk',
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

  /**
   * Carga los datos de un device
   * @param device, device a mostrar
   */
  tempData(device) {

    this.devicedata.getByDevice(device).subscribe(result => {

      let data = [];
      let date = [];

      Object.keys(result).some(function (key) {
        data.push(result[key]['Record']['temperature']);
        let tempDate = new Date(parseInt(result[key]['Record']['hour']));
        date.push(tempDate.toLocaleDateString());
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

  /**
   * Evento de cambio de valores en nodos
   * @param selectedValues, valor seleccionado
   */
  onSelectChange(selectedValue: any) {
    this.tempData(selectedValue.detail.value);
  }

}
