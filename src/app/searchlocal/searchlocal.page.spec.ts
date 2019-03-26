import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchlocalPage } from './searchlocal.page';

describe('SearchlocalPage', () => {
  let component: SearchlocalPage;
  let fixture: ComponentFixture<SearchlocalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchlocalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchlocalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
