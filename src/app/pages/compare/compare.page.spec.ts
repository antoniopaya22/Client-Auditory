import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { ComparePage } from './compare.page';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule, MatPaginatorModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

describe('ComparePage', () => {

  let statusBarSpy, splashScreenSpy, platformReadySpy, platformSpy;
  let component: ComparePage;
  let fixture: ComponentFixture<ComparePage>;

  beforeEach(async(() => {
    statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
    splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);
    platformReadySpy = Promise.resolve();
    platformSpy = jasmine.createSpyObj('Platform', { ready: platformReadySpy });

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
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

  it('should create ComparePage', () => {
    expect(component).toBeTruthy();
  });


});
