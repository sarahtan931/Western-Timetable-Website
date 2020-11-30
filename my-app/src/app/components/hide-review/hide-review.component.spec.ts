import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HideReviewComponent } from './hide-review.component';

describe('HideReviewComponent', () => {
  let component: HideReviewComponent;
  let fixture: ComponentFixture<HideReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HideReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HideReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
