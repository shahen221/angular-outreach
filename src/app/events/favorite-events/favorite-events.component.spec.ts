import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteEventsComponent } from './favorite-events.component';

describe('FavoriteEventsComponent', () => {
  let component: FavoriteEventsComponent;
  let fixture: ComponentFixture<FavoriteEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
