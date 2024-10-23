import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Order } from 'src/app/models/order.model';

@Component({
  selector: 'app-user-order-details-dialog',
  templateUrl: './user-order-details-dialog.component.html',
  styleUrls: ['./user-order-details-dialog.component.scss'],
})
export class UserOrderDetailsDialogComponent {
  orderCount: number;
  orders: Order[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UserOrderDetailsDialogComponent>
  ) {
    this.orderCount = data.orderCount;
    this.orders = data.orders || [];
  }

  viewOrderDetails(order: any): void {
    console.log('Viewing order details for:', order);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
