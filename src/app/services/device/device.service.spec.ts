import { TestBed, async } from '@angular/core/testing';

import { DeviceService } from './device.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DeviceService', () => {

    let statusBarSpy, splashScreenSpy, platformReadySpy, platformSpy;

    beforeEach(async(() => {
        statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
        splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);
        platformReadySpy = Promise.resolve();
        platformSpy = jasmine.createSpyObj('Platform', { ready: platformReadySpy });
    
        TestBed.configureTestingModule({
          imports: [
            RouterTestingModule,
            HttpClientTestingModule
          ]
        });
      }));

  it('Crear componente', () => {
    const service: DeviceService = TestBed.get(DeviceService);
    expect(service).toBeTruthy();
  });

  it('Obtener todos los datos', () => {
    const service: DeviceService = TestBed.get(DeviceService);
    service.getAllData().subscribe(res => {
        expect(Object.keys(res).length).toBeGreaterThanOrEqual(0);
    } , err => {
        fail(err);
    });
  });

  it('Obtener ultimos datos de cada device', () => {
    const service: DeviceService = TestBed.get(DeviceService);
    service.getLatestData().subscribe(res => {
        expect(Object.keys(res).length).toBeGreaterThanOrEqual(0);
    } , err => {
        fail(err);
    });
  });

  it('Obtener historial de un dato dado su id', () => {
    const service: DeviceService = TestBed.get(DeviceService);
    service.getHistoryData('ID_PRUEBA_0').subscribe(res => {
        expect(Object.keys(res).length).toBeGreaterThanOrEqual(0);
    } , err => {
        fail(err);
    });
  });

  it('Obtener datos de un nodo', () => {
    const service: DeviceService = TestBed.get(DeviceService);
    service.getByNodo('peer0.asturias.antonio.com').subscribe(res => {
        expect(Object.keys(res).length).toBeGreaterThanOrEqual(0);
        for (const key in res) {
            if(key !== undefined) {
                expect(res[key].Record.node == 'peer0.asturias.antonio.com');
            }
        }
    } , err => {
        fail(err);
    });
  });

  it('Obtener datos de un device', () => {
    const service: DeviceService = TestBed.get(DeviceService);
    service.getByDevice('asturias_device').subscribe(res => {
        expect(Object.keys(res).length).toBeGreaterThanOrEqual(0);
        for (const key in res) {
            if(key !== undefined) {
                expect(res[key].Record.device == 'asturias_device');
            }
        }
    } , err => {
        fail(err);
    });
  });
});