import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAupComponent } from './create-aup.component';

describe('CreateAupComponent', () => {
  let component: CreateAupComponent;
  let fixture: ComponentFixture<CreateAupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
