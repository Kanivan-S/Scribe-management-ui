import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerAnalysisComponent } from './volunteer-analysis.component';

describe('VolunteerAnalysisComponent', () => {
  let component: VolunteerAnalysisComponent;
  let fixture: ComponentFixture<VolunteerAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolunteerAnalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
