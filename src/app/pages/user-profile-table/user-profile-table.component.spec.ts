import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileTableComponent } from './user-profile-table.component';

describe('UserProfileTableComponent', () => {
  let component: UserProfileTableComponent;
  let fixture: ComponentFixture<UserProfileTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
