import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSchedComponent } from './show-sched.component';

describe('ShowSchedComponent', () => {
  let component: ShowSchedComponent;
  let fixture: ComponentFixture<ShowSchedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSchedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
