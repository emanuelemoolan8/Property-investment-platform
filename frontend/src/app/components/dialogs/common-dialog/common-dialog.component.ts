import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-common-dialog',
  templateUrl: './common-dialog.component.html',
  styleUrls: ['./common-dialog.component.scss'],
})
export class CommonDialogComponent {
  safeContent: SafeHtml;

  constructor(
    public dialogRef: MatDialogRef<CommonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; content: string },
    private sanitizer: DomSanitizer
  ) {
    this.safeContent = this.sanitizer.bypassSecurityTrustHtml(data.content);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
