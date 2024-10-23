import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarDialogComponent } from './snackbar-dialog.component';

describe('SnackbarDialogComponent', () => {
  let component: SnackbarDialogComponent;
  let fixture: ComponentFixture<SnackbarDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnackbarDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnackbarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
