import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePoliciesComponent } from './create-policies.component';

describe('CreatePoliciesComponent', () => {
  let component: CreatePoliciesComponent;
  let fixture: ComponentFixture<CreatePoliciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePoliciesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
