import { TestBed, async } from '@angular/core/testing';

import { DeviceReadService } from './device-read.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DeviceReadService', () => {

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
    const service: DeviceReadService = TestBed.get(DeviceReadService);
    expect(service).toBeTruthy();
  });

  it('Obtener todos los datos', () => {
    const service: DeviceReadService = TestBed.get(DeviceReadService);
    service.getAllData('peer0.asturias.antonio.com').then(value => {value.subscribe(res => {
        expect(Object.keys(res).length).toBeGreaterThanOrEqual(0);
      } , err => {
        fail(err);
      })});
  });
});