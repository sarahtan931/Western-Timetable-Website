import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePairsComponent } from './create-pairs.component';

describe('CreatePairsComponent', () => {
  let component: CreatePairsComponent;
  let fixture: ComponentFixture<CreatePairsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePairsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePairsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
