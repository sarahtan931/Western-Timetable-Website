import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTimetableComponent } from './course-timetable.component';

describe('CourseTimetableComponent', () => {
  let component: CourseTimetableComponent;
  let fixture: ComponentFixture<CourseTimetableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseTimetableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseTimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
