import { Component, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AddBalanceDialogComponent } from 'src/app/components/dialogs/add-balance-dialog/add-balance-dialog.component';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { User } from 'src/app/models/user.model';
import { UserOrderDetailsDialogComponent } from '../dialogs/user-order-details-dialog/user-order-details-dialog.component';
import { Order } from 'src/app/models/order.model';

@Component({
  selector: 'app-user-details-card',
  templateUrl: './user-details-card.component.html',
  styleUrls: ['./user-details-card.component.scss'],
})
export class UserDetailsCardComponent {
  @Input() fundStatus: number = 0;

  userName: string = '';
  roleType: string = 'Investor';
  residentImpact: number = 0;
  orders!: Order[];
  orderCount: number = 0;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private snackbarService: SnackBarService
  ) {
    this.fetchUserDetails();
  }

  fetchUserDetails(): void {
    this.userService.getUserDetails().subscribe((details: User) => {
      this.fundStatus = details.balance;
      this.orderCount = details.orders?.length ?? 0;
      this.orders = details.orders ?? [];
    });
  }

  addBalance(): void {
    const dialogRef = this.dialog.open(AddBalanceDialogComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchUserDetails();
      }
    });
  }

  showOrderDetails(): void {
    const dialogRef = this.dialog.open(UserOrderDetailsDialogComponent, {
      width: '400px',
      data: { orderCount: this.orderCount, orders: this.orders },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  viewOrderDetail(order: Order): void {
    console.log('Order details:', order);
  }
}
