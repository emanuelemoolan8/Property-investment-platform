import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropertyService } from '../../../services/property.service';
import { SnackBarService } from '../../../services/snackbar.service';
import { Property } from '../../../models/property.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-property-dialog',
  templateUrl: './add-property-dialog.component.html',
  styleUrls: ['./add-property-dialog.component.scss'],
})
export class AddPropertyDialogComponent {
  propertyForm: FormGroup;
  @Output() propertyAdded = new EventEmitter<Property>();

  constructor(
    public dialogRef: MatDialogRef<AddPropertyDialogComponent>,
    private fb: FormBuilder,
    private propertyService: PropertyService,
    private snackBarService: SnackBarService,
    private router: Router
  ) {
    this.propertyForm = this.fb.group({
      city: ['', Validators.required],
      address: ['', Validators.required],
      totalPieces: [0, [Validators.required, Validators.min(1)]],
      availablePieces: [0, [Validators.required, Validators.min(0)]],
      soldPieces: [0, [Validators.required, Validators.min(0)]],
      unitPrice: [0, [Validators.required, Validators.min(0)]],
      status: ['available', Validators.required],
    });
  }

  onSubmit() {
    if (this.propertyForm.valid) {
      const newProperty: Property = this.propertyForm.value;
      this.propertyService.addProperty(newProperty).subscribe(
        (response) => {
          this.snackBarService.openSnackbar('Property added successfully!');
          this.propertyAdded.emit(response);
          this.dialogRef.close(true);
        },
        (error) => {
          this.snackBarService.openSnackbar('Failed to add property.', 'error');
        }
      );
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
