import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeauthComponent } from './homeauth.component';

describe('HomeauthComponent', () => {
  let component: HomeauthComponent;
  let fixture: ComponentFixture<HomeauthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeauthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
