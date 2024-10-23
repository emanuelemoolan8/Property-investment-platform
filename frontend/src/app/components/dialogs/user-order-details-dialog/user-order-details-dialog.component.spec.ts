import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrderDetailsDialogComponent } from './user-order-details-dialog.component';

describe('UserOrderDetailsDialogComponent', () => {
  let component: UserOrderDetailsDialogComponent;
  let fixture: ComponentFixture<UserOrderDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserOrderDetailsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserOrderDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
