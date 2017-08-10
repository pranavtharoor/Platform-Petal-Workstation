/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JwtComponent } from './jwt.component';

describe('JwtComponent', () => {
  let component: JwtComponent;
  let fixture: ComponentFixture<JwtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JwtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JwtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
