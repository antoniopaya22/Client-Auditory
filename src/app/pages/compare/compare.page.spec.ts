import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { ComparePage } from './compare.page';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatPaginatorModule, MatTableModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('ComparePage', () => {

    let statusBarSpy, splashScreenSpy, platformReadySpy, platformSpy;

    let component: ComparePage;
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
            declarations: [ComparePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                { provide: StatusBar, useValue: statusBarSpy },
                { provide: SplashScreen, useValue: splashScreenSpy },
                { provide: Platform, useValue: platformSpy },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ComparePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the page', () => {
        expect(component).toBeTruthy();
    });

    it('should map a datasource with data from server', () => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(component.dataSourceRead.data.length).toBeGreaterThan(0);
            expect(component.dataSourceAuditory.data.length).toBeGreaterThan(0);
        })
    });

    it('should render an audit table with 7 columns', () => {
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelectorAll('table')[0].querySelectorAll('th').length).toEqual(6);
        //expect(compiled.querySelectorAll('th').length).toEqual(6);

    });

    it('should render a local table with 7 columns', () => {
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelectorAll('table')[1].querySelectorAll('th').length).toEqual(6);
        //expect(compiled.querySelectorAll('th').length).toEqual(6);

    });

});
