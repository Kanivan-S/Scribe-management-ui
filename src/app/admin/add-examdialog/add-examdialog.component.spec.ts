import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExamdialogComponent } from './add-examdialog.component';

describe('AddExamdialogComponent', () => {
  let component: AddExamdialogComponent;
  let fixture: ComponentFixture<AddExamdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExamdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExamdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
