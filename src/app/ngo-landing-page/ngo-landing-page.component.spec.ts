import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgoLandingPageComponent } from './ngo-landing-page.component';

describe('NgoLandingPageComponent', () => {
  let component: NgoLandingPageComponent;
  let fixture: ComponentFixture<NgoLandingPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgoLandingPageComponent]
    });
    fixture = TestBed.createComponent(NgoLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
