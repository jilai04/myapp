import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JimtestComponent } from './jimtest.component';

describe('JimtestComponent', () => {
  let component: JimtestComponent;
  let fixture: ComponentFixture<JimtestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JimtestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JimtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
