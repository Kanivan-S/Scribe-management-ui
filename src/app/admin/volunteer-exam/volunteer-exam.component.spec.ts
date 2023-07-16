import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerExamComponent } from './volunteer-exam.component';

describe('VolunteerExamComponent', () => {
  let component: VolunteerExamComponent;
  let fixture: ComponentFixture<VolunteerExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolunteerExamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
