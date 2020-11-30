import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrantAdminComponent } from './grant-admin.component';

describe('GrantAdminComponent', () => {
  let component: GrantAdminComponent;
  let fixture: ComponentFixture<GrantAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrantAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrantAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
