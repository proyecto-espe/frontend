import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbooardAdminComponent } from './dashbooard-admin.component';

describe('DashbooardAdminComponent', () => {
  let component: DashbooardAdminComponent;
  let fixture: ComponentFixture<DashbooardAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashbooardAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashbooardAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
