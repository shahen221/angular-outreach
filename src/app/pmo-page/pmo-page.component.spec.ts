import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmoPageComponent } from './pmo-page.component';

describe('PmoPageComponent', () => {
  let component: PmoPageComponent;
  let fixture: ComponentFixture<PmoPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmoPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
