import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarDialogComponent } from '../components/dialogs/snackbar-dialog/snackbar-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private dialog: MatDialog) {}

  openSnackbar(message: string, type: string = 'success') {
    const dialogRef = this.dialog.open(SnackbarDialogComponent, {
      data: { message, type },
      panelClass: 'custom-dialog',
      backdropClass: 'backdrop',
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
    });

    setTimeout(() => {
      dialogRef.close();
    }, 3000);
  }
}
