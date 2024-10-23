import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-snackbar-dialog',
  templateUrl: './snackbar-dialog.component.html',
  styleUrls: ['./snackbar-dialog.component.scss'],
})
export class SnackbarDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SnackbarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string; type: string }
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
