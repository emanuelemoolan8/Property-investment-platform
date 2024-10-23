import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { Property } from '../../models/property.model';
import { UserService } from '../../services/user.service'; // Import UserService
import { OrderService } from 'src/app/services/order.service';
import { SnackBarService } from 'src/app/services/snackbar.service'; // Import SnackBarService
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss'],
})
export class PropertyDetailComponent implements OnInit {
  property: Property | undefined;
  currentUser: User | undefined;
  pieces: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propertyService: PropertyService,
    private orderService: OrderService,
    private userService: UserService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    const propertyId = this.route.snapshot.paramMap.get('id');
    if (propertyId) {
      this.propertyService.getPropertyById(propertyId).subscribe((data) => {
        this.property = data;
      });
    }

    this.userService.getUserDetails().subscribe((user) => {
      this.currentUser = user;
    });
  }

  orderPieces(pieces: number): void {
    if (this.property && !isNaN(pieces)) {
      this.orderService
        .placeOrder({
          propertyId: this.property.id,
          pieces: pieces,
        })
        .subscribe(
          (response) => {
            this.snackBarService.openSnackbar('Order placed successfully!');
            this.router.navigate(['/']);
          },
          (error) => {
            console.error('Order placement failed:', error);
            this.snackBarService.openSnackbar(
              'Failed to place order. Please try again.' + error.error.message,
              'error'
            );
          }
        );
    } else {
      this.snackBarService.openSnackbar(
        'Please enter a valid number of pieces',
        'warning'
      );
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
