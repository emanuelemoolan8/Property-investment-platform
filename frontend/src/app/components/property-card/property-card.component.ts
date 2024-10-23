import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { UserService } from '../../services/user.service';
import { SnackBarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.scss'],
})
export class PropertyCardComponent {
  @Input() property: any;
  currentUser: any;

  constructor(
    private router: Router,
    private propertyService: PropertyService,
    private userService: UserService,
    private snackBarService: SnackBarService
  ) {
    this.userService.getUserDetails().subscribe((user) => {
      this.currentUser = user;
    });
  }

  viewDetails(): void {
    this.router.navigate(['/properties', this.property.id]);
  }

  deleteProperty(): void {
    if (confirm('Are you sure you want to delete this property?')) {
      this.propertyService.deleteProperty(this.property.id).subscribe(
        (response) => {
          this.snackBarService.openSnackbar('Property deleted successfully!');
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Failed to delete property:', error);
          this.snackBarService.openSnackbar(
            'Failed to delete property. Please try again.',
            'error'
          );
        }
      );
    }
  }
}
