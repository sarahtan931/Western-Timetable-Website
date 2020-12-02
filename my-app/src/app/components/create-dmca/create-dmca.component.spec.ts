import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDmcaComponent } from './create-dmca.component';

describe('CreateDmcaComponent', () => {
  let component: CreateDmcaComponent;
  let fixture: ComponentFixture<CreateDmcaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDmcaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDmcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
