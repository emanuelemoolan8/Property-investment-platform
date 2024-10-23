import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PropertyService } from '../../services/property.service';
import { Property } from '../../models/property.model';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user.model';
import { AddPropertyDialogComponent } from '../dialogs/add-property-dialog/add-property-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  featuredProperties: Property[] = [];
  isPropertyManager = false;
  roleType: string = 'Investor';
  userName: string = 'User';
  fundStatus: number = 0;

  constructor(
    private propertyService: PropertyService,
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadUserRoleAndProperties();
    this.fetchUserDetails();
  }

  private loadUserRoleAndProperties(): void {
    this.userService.getUserDetails().subscribe(
      (user: User) => {
        this.isPropertyManager = user?.role === 'PROPERTY_MANAGER';
        this.loadFeaturedProperties();
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  fetchUserDetails(): void {
    this.userService.getUserDetails().subscribe((details) => {
      this.userName = details.name;
      this.roleType = details.role;
      this.fundStatus = details.balance;
    });
  }

  private loadFeaturedProperties(): void {
    this.propertyService.getProperties().subscribe(
      (data: Property[]) => {
        this.featuredProperties = data;
      },
      (error) => {
        console.error('Error fetching properties:', error);
      }
    );
  }

  openAddPropertyDialog(): void {
    const dialogRef = this.dialog.open(AddPropertyDialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        this.loadFeaturedProperties();
      }
    });
  }
}
