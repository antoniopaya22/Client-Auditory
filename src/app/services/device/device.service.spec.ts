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

  it('should be created', () => {
    const service: DeviceService = TestBed.get(DeviceService);
    expect(service).toBeTruthy();
  });

  it('should get all data', () => {
    const service: DeviceService = TestBed.get(DeviceService);
    service.getAllData().subscribe(res => {
        expect(Object.keys(res).length).toBeGreaterThanOrEqual(0);
    } , err => {
        fail(err);
    });
  });

  it('should get latest data', () => {
    const service: DeviceService = TestBed.get(DeviceService);
    service.getLatestData().subscribe(res => {
        expect(Object.keys(res).length).toBeGreaterThanOrEqual(0);
    } , err => {
        fail(err);
    });
  });

  it('should get history data', () => {
    const service: DeviceService = TestBed.get(DeviceService);
    service.getHistoryData('ID_PRUEBA_0').subscribe(res => {
        expect(Object.keys(res).length).toBeGreaterThanOrEqual(0);
    } , err => {
        fail(err);
    });
  });

  it('should get dataByNode', () => {
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

  it('should get data by device', () => {
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