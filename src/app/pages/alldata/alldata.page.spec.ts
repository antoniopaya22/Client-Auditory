import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AlldataPage } from './alldata.page';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatPaginatorModule, MatTableModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('AlldataPage', () => {

    let statusBarSpy, splashScreenSpy, platformReadySpy, platformSpy;

    let component: AlldataPage;
    let fixture;
    beforeEach(async(() => {
        statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
        splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);
        platformReadySpy = Promise.resolve();
        platformSpy = jasmine.createSpyObj('Platform', { ready: platformReadySpy });

        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
                MatPaginatorModule,
                MatTableModule,
                BrowserAnimationsModule
            ],
            declarations: [AlldataPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                { provide: StatusBar, useValue: statusBarSpy },
                { provide: SplashScreen, useValue: splashScreenSpy },
                { provide: Platform, useValue: platformSpy },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AlldataPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Crear componente', () => {
        expect(component).toBeTruthy();
    });

    it('Cargar datos en la tabla', () => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(component.dataSource.data.length).toBeGreaterThan(0);
        })
    });

    it('Renderizar tabla', () => {
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelectorAll('th').length).toEqual(7);

    });

});
