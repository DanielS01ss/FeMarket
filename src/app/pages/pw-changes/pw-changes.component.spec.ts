import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PwChangesComponent } from './pw-changes.component';

describe('PwChangesComponent', () => {
  let component: PwChangesComponent;
  let fixture: ComponentFixture<PwChangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PwChangesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PwChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
