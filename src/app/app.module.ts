import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register//register.component';
import { FarmerDashboardComponent } from './pages/farmer-dashboard/farmer-dashboard.component';
import { DealerDashboardComponent } from './pages/dealer-dashboard/dealer-dashboard.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,

    FarmerDashboardComponent,
    DealerDashboardComponent,
    AdminDashboardComponent,
    
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    RouterModule.forRoot([ // ✅ Ensure routes are defined
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '', redirectTo: '/login', pathMatch: 'full' }
    ]),
    LoginComponent,
    RegisterComponent,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
