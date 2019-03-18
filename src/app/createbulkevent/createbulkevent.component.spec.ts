import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatebulkeventComponent } from './createbulkevent.component';

describe('CreatebulkeventComponent', () => {
  let component: CreatebulkeventComponent;
  let fixture: ComponentFixture<CreatebulkeventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatebulkeventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatebulkeventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
