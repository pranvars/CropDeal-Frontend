import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { FarmerDashboardComponent } from './pages/farmer-dashboard/farmer-dashboard.component';
import { DealerDashboardComponent } from './pages/dealer-dashboard/dealer-dashboard.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  
  { path: 'register', component: RegisterComponent },
  { path: 'farmer-dashboard', component: FarmerDashboardComponent },
  { path: 'dealer-dashboard', component: DealerDashboardComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
