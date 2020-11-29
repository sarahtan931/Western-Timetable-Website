import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTimetableComponent } from './show-timetable.component';

describe('ShowTimetableComponent', () => {
  let component: ShowTimetableComponent;
  let fixture: ComponentFixture<ShowTimetableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowTimetableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
