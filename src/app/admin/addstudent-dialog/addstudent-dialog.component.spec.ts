import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddstudentDialogComponent } from './addstudent-dialog.component';

describe('AddstudentDialogComponent', () => {
  let component: AddstudentDialogComponent;
  let fixture: ComponentFixture<AddstudentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddstudentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddstudentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
