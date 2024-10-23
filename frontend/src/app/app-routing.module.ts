import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertyDetailComponent } from './components/property-detail/property-detail.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthRedirectGuard } from './auth/auth-redirect.guard';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthRedirectGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthRedirectGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'properties/:id',
    component: PropertyDetailComponent,
    canActivate: [AuthGuard],
  },

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
