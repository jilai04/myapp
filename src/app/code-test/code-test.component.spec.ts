import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeTestComponent } from './code-test.component';

describe('CodeTestComponent', () => {
  let component: CodeTestComponent;
  let fixture: ComponentFixture<CodeTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
