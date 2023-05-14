import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedsComponent } from './recommendeds.component';

describe('RecommendedsComponent', () => {
  let component: RecommendedsComponent;
  let fixture: ComponentFixture<RecommendedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendedsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecommendedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
