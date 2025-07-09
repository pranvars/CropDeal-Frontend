import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  farmers: any[] = [];
  dealers: any[] = [];
  isLoadingFarmers: boolean = false;
  isLoadingDealers: boolean = false;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadFarmers();
    this.loadDealers();
  }

  // ✅ Fetch Farmers with usernames
  loadFarmers() {
    this.isLoadingFarmers = true; // ✅ Show loading indicator
    this.adminService.getAllFarmers().subscribe(
      (data) => {
        if (data && Array.isArray(data)) {
          this.farmers = data.map(farmer => ({
            ...farmer,
            isActive: farmer.isActive ?? false,
            username: '' // ✅ Initialize username
          }));

          // Fetch Usernames in Parallel
          this.farmers.forEach(farmer => {
            this.adminService.getUsername(farmer.userId).subscribe(
              (username) => farmer.username = username,
              (error) => console.error("Error fetching username:", error)
            );
          });
        }
        this.isLoadingFarmers = false; // ✅ Hide loading indicator
      },
      (error) => {
        console.error("Error fetching farmers:", error);
        this.isLoadingFarmers = false; // ✅ Hide loading on error
      }
    );
  }

  // ✅ Fetch Dealers with usernames
  loadDealers() {
    this.isLoadingDealers = true; // ✅ Show loading indicator
    this.adminService.getAllDealers().subscribe(
      (data) => {
        if (data && Array.isArray(data)) {
          this.dealers = data.map(dealer => ({
            ...dealer,
            isActive: dealer.isActive ?? false,
            username: '' // ✅ Initialize username
          }));

          // Fetch Usernames in Parallel
          this.dealers.forEach(dealer => {
            this.adminService.getUsername(dealer.userId).subscribe(
              (username) => dealer.username = username,
              (error) => console.error("Error fetching username:", error)
            );
          });
        }
        this.isLoadingDealers = false; // ✅ Hide loading indicator
      },
      (error) => {
        console.error("Error fetching dealers:", error);
        this.isLoadingDealers = false; // ✅ Hide loading on error
      }
    );
  }

  // ✅ Toggle Farmer Status
  toggleFarmerStatus(farmer: any) {
    const newStatus = !farmer.isActive;
    this.adminService.updateFarmerStatus(farmer.farmerId, newStatus).subscribe(
      () => {
        farmer.isActive = newStatus; // ✅ Update button text dynamically
      },
      (error) => console.error("Error updating farmer status:", error)
    );
  }

  // ✅ Toggle Dealer Status
  toggleDealerStatus(dealer: any) {
    const newStatus = !dealer.isActive;
    this.adminService.updateDealerStatus(dealer.dealerId, newStatus).subscribe(
      () => {
        dealer.isActive = newStatus; // ✅ Update button text dynamically
      },
      (error) => console.error("Error updating dealer status:", error)
    );
  }
}
