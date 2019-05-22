import { TestBed, async } from '@angular/core/testing';

import { UserService } from './user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserService', () => {

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
        const service: UserService = TestBed.get(UserService);
        expect(service).toBeTruthy();
      });
    
      it('Iniciar sesion', () => {
        const service: UserService = TestBed.get(UserService);
        const data = {
            userName: 'user',
            password: 'user'
        };
        service.login(data).subscribe(res => {
            expect(res).not.toBeNull();
        }, err => {
            fail(err);
        });
      });
    
      it('Cerrar sesion con sesion iniciada', () => {
        const service: UserService = TestBed.get(UserService);
        const data = {
            userName: 'user',
            password: 'user'
        };
        service.login(data).subscribe(res => {
            service.removeToken();
            expect(service.getToken() === null);
        }, err => {
            fail(err);
        });
      });
    
      it('Cerrar sesion con sesion iniciada', () => {
        const service: UserService = TestBed.get(UserService);
        service.removeToken();
        expect(service.getToken() === null);
      });
});