import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatebulkregistrationComponent } from './createbulkregistration.component';

describe('CreatebulkregistrationComponent', () => {
  let component: CreatebulkregistrationComponent;
  let fixture: ComponentFixture<CreatebulkregistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatebulkregistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatebulkregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
