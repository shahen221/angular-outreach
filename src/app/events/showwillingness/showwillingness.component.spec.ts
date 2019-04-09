import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowwillingnessComponent } from './showwillingness.component';

describe('ShowwillingnessComponent', () => {
  let component: ShowwillingnessComponent;
  let fixture: ComponentFixture<ShowwillingnessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowwillingnessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowwillingnessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
