import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';
import { CommonDialogComponent } from '../dialogs/common-dialog/common-dialog.component';
import { CurrencyPipe } from '@angular/common';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  userDetails: User | null = null;
  isCollapsed = false;

  navItems = [
    { label: 'Dashboard', icon: 'dashboard', link: '/' },
    {
      label: 'Contact Us',
      icon: 'contact_mail',
      action: () => this.openAboutDialog(),
    },
    {
      label: 'Profile',
      icon: 'person',
      action: () => this.openUserDetailsDialog(),
    },
  ];

  constructor(
    private router: Router,
    private userService: UserService,
    private dialog: MatDialog,
    private currencyPipe: CurrencyPipe,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.isLoggedIn()) {
      this.fetchUserDetails();
    }
  }

  toggleSidenav() {
    this.isCollapsed = !this.isCollapsed;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  fetchUserDetails(): void {
    this.userService.getUserDetails().subscribe((details) => {
      this.userDetails = details;
    });
  }

  onLogout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.authService.setAuthState(false);
  }

  openAboutDialog(): void {
    this.dialog.open(CommonDialogComponent, {
      data: {
        title: 'About Us',
        content:
          'Our mission is to provide a seamless and accessible way for individuals to invest in real estate. Here you can invest in premium properties and earn dividends. We believe in making real estate investment available to everyone, enabling you to diversify your portfolio with ease.',
      },
    });
  }

  openUserDetailsDialog(): void {
    const balanceFormatted =
      this.userDetails?.role === 'INVESTOR'
        ? this.currencyPipe.transform(this.userDetails.balance, 'USD')
        : 'N/A';

    const createdAt = this.userDetails?.createdAt
      ? new Date(this.userDetails.createdAt).toLocaleString()
      : 'N/A';

    const updatedAt = this.userDetails?.updatedAt
      ? new Date(this.userDetails.updatedAt).toLocaleString()
      : 'N/A';

    this.dialog.open(CommonDialogComponent, {
      data: {
        title: 'User Details',
        content: `
          <div style="text-align: left;">
            <p><strong>Name:</strong> ${this.userDetails?.name}</p>
            <p><strong>Email:</strong> ${this.userDetails?.email}</p>
            ${
              this.userDetails?.role === 'INVESTOR'
                ? `<p><strong>Balance:</strong> ${balanceFormatted}</p>`
                : ''
            }
            <p><strong>Role:</strong> ${this.userDetails?.role}</p>
            <p><strong>Account Created At:</strong> ${createdAt}</p>
            <p><strong>Last Updated At:</strong> ${updatedAt}</p>
          </div>
        `,
      },
    });
  }
}
