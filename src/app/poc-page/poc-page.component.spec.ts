import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PocPageComponent } from './poc-page.component';

describe('PocPageComponent', () => {
  let component: PocPageComponent;
  let fixture: ComponentFixture<PocPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PocPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PocPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
