import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerCheckinComponent } from './volunteer-checkin.component';

describe('VolunteerCheckinComponent', () => {
  let component: VolunteerCheckinComponent;
  let fixture: ComponentFixture<VolunteerCheckinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolunteerCheckinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerCheckinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
