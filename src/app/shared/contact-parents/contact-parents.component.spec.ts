import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactParentsComponent } from './contact-parents.component';

describe('ContactParentsComponent', () => {
  let component: ContactParentsComponent;
  let fixture: ComponentFixture<ContactParentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactParentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactParentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
