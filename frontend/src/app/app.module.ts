import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PropertyDetailComponent } from './components/property-detail/property-detail.component';
import { HttpClientModule } from '@angular/common/http'; // For API calls

// Import Angular Material modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PropertyCardComponent } from './components/property-card/property-card.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';

import { MatIconModule } from '@angular/material/icon';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { UserDetailsCardComponent } from './components/user-details-card/user-details-card.component';
import { AddBalanceDialogComponent } from './components/dialogs/add-balance-dialog/add-balance-dialog.component';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarDialogComponent } from './components/dialogs/snackbar-dialog/snackbar-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { AddPropertyDialogComponent } from './components/dialogs/add-property-dialog/add-property-dialog.component';
import { CommonDialogComponent } from './components/dialogs/common-dialog/common-dialog.component';
import { CurrencyPipe } from '@angular/common';
import { UserOrderDetailsDialogComponent } from './components/dialogs/user-order-details-dialog/user-order-details-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PropertyDetailComponent,
    PropertyCardComponent,
    RegisterComponent,
    LoginComponent,
    NotFoundComponent,
    UserDetailsCardComponent,
    AddBalanceDialogComponent,
    SidebarComponent,
    SnackbarDialogComponent,
    AddPropertyDialogComponent,
    CommonDialogComponent,
    UserOrderDetailsDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSidenavModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSelectModule,
  ],
  providers: [CurrencyPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
