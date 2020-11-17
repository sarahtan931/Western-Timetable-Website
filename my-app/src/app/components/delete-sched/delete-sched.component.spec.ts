import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSchedComponent } from './delete-sched.component';

describe('DeleteSchedComponent', () => {
  let component: DeleteSchedComponent;
  let fixture: ComponentFixture<DeleteSchedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSchedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
