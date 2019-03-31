import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlldataPage } from './alldata.page';

describe('AlldataPage', () => {
  let component: AlldataPage;
  let fixture: ComponentFixture<AlldataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlldataPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlldataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
