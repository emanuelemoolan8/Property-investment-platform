import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-balance-dialog',
  templateUrl: './add-balance-dialog.component.html',
  styleUrls: ['./add-balance-dialog.component.scss'],
})
export class AddBalanceDialogComponent {
  amount: number = 0;

  constructor(
    private dialogRef: MatDialogRef<AddBalanceDialogComponent>,
    private snackBarService: SnackBarService,
    private userService: UserService
  ) {}

  onSubmit(): void {
    const token = localStorage.getItem('token');

    this.userService.addBalance(this.amount).subscribe(
      (response) => {
        console.log('Balance added successfully:', response);
        this.snackBarService.openSnackbar(
          `Amount $ ${this.amount} Added successfully!`,
          'success'
        );
        this.dialogRef.close(true);
      },
      (error) => {
        console.error('Error adding balance:', error);
        this.snackBarService.openSnackbar(
          'Error adding balance!' +
            (error.error?.message || error.message || 'Unknown error'),
          'error'
        );
        this.dialogRef.close(false);
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
