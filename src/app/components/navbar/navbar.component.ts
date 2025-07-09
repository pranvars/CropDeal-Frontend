import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  constructor(private authService: AuthService, private router: Router) {}

  get isLoggedIn(): boolean {
    return !!this.authService.getToken(); // ✅ Dynamic check instead of subscription
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // ✅ Redirect to login after logout
  }
}
