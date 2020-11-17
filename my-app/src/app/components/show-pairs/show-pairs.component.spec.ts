import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPairsComponent } from './show-pairs.component';

describe('ShowPairsComponent', () => {
  let component: ShowPairsComponent;
  let fixture: ComponentFixture<ShowPairsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPairsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPairsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
