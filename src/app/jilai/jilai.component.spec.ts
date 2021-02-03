import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JilaiComponent } from './jilai.component';

describe('JilaiComponent', () => {
  let component: JilaiComponent;
  let fixture: ComponentFixture<JilaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JilaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JilaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
