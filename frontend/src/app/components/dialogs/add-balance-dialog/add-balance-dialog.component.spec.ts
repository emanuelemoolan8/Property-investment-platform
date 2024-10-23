import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBalanceDialogComponent } from './add-balance-dialog.component';

describe('AddBalanceDialogComponent', () => {
  let component: AddBalanceDialogComponent;
  let fixture: ComponentFixture<AddBalanceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBalanceDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBalanceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
