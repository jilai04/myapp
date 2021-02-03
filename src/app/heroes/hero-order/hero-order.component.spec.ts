import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroOrderComponent } from './hero-order.component';

describe('HeroOrderComponent', () => {
  let component: HeroOrderComponent;
  let fixture: ComponentFixture<HeroOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
