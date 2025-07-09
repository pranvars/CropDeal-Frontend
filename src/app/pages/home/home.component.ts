import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dashboardTitle = 'Welcome to CropDeal';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const role = this.authService.getUserRole();
    if (role) {
      this.dashboardTitle = `${role} Dashboard`;
    }
  }
}
