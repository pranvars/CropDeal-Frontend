import { Component, OnInit, ChangeDetectorRef, createPlatformFactory } from '@angular/core';
import { FarmerService } from '../../services/farmer.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-farmer-dashboard',
  standalone: false,
  templateUrl: './farmer-dashboard.component.html',
  styleUrls: ['./farmer-dashboard.component.css']
})
export class FarmerDashboardComponent implements OnInit {
  crops: any[] = [];
  transactions: any[] = [];
  farmerId: number = 0;
  userId: number = 0;

  startDate: string = '';
  endDate: string = '';

  farmer: any = {
    name: '',
    location: '',
    accountNumber: '',
    bankIfscCode: ''
  };

  newCrop: any = {
    name: '',
    quantity: 0,
    price: 0
  };

  // Toggle Variables
  showProfile = false;
  showPublishCrop = false;
  showViewCrops = false;
  showTransactions = false;

  constructor(
    private farmerService: FarmerService,
    private authService: AuthService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    let user = JSON.parse(sessionStorage.getItem('user') || '{}');
    
    if (user && user.userId) {
      this.userId = user.userId;
      this.fetchFarmerId(this.userId);
    } else {
      console.error('User ID not found in session.');
    }
  }

  /** Fetch Farmer ID using User ID */
  fetchFarmerId(userId: number) {
    this.farmerService.getFarmerId(userId).subscribe(
      (id: number) => {
        if (!id) {
          console.error('Farmer ID not found for User ID:', userId);
          return;
        }

        this.farmerId = id;
        console.log('Farmer ID Retrieved:', this.farmerId);
        this.cdRef.detectChanges();
        
        this.loadCrops();
        this.loadFarmerProfile();
      },
      (error: any) => console.error('Error fetching Farmer ID:', error)
    );
  }

  /** Load Farmer Profile */
  loadFarmerProfile() {
    if (this.farmerId === 0) {
      console.error('Invalid Farmer ID. Cannot fetch profile.');
      return;
    }

    this.farmerService.getFarmerById(this.farmerId).subscribe(
      (data: any) => {
        if (!data) {
          console.error('Farmer profile not found.');
          return;
        }
        console.log('Farmer Profile:', data);
        this.farmer = {
          location: data.location || '',
          accountNumber: data.accountNumber || '',
          bankIfscCode: data.bankIfsccode || ''
        };
        console.log('Farmer Profile Loaded:', this.farmer);
      },
      (error: any) => console.error('Error fetching farmer profile:', error)
    );
  }

  /** Update Farmer Profile */
  updateFarmerProfile() {
    if (!this.farmer.location || !this.farmer.accountNumber || !this.farmer.bankIfscCode) {
      console.error('Please enter valid profile details.');
      return;
    }

    if (this.userId === 0 || this.farmerId === 0) {
      console.error('Missing User ID or Farmer ID. Cannot update profile.');
      return;
    }

    const updatedFarmer = {
      userId: this.userId,
      farmerId: this.farmerId,
      location: this.farmer.location,
      accountNumber: this.farmer.accountNumber,
      bankIfscCode: this.farmer.bankIfscCode
    };

    this.farmerService.updateFarmer(this.farmerId, updatedFarmer).subscribe(
      (response: any) => {
        console.log('Profile updated successfully', response);
        alert('Profile updated successfully!');
      },
      (error: any) => console.error('Error updating profile:', error)
    );
  }

  /** Toggle Section Visibility */
  toggleSection(section: string) {
    this.showProfile = section === 'profile' ? !this.showProfile : false;
    this.showPublishCrop = section === 'publishCrop' ? !this.showPublishCrop : false;
    this.showViewCrops = section === 'viewCrops' ? !this.showViewCrops : false;
    this.showTransactions = section === 'transactions' ? !this.showTransactions : false;
  }

  /** Load Crops */
  loadCrops() {
    this.farmerService.getAllCrops().subscribe(
      (data: any[]) => {
        if (!data || data.length === 0) {
          console.warn('No crops found.');
          return;
        }

        this.crops = data.map(crop => ({
          cropId: crop.cropId,
          farmerId: crop.farmerId,
          name: crop.name,
          quantity: crop.quantity,
          price: crop.price
        }));
      },
      (error: any) => console.error('Error fetching crops:', error)
    );
  }

  /** Load Transactions */
  loadTransactions() {
    if (!this.startDate || !this.endDate || this.farmerId === 0) {
      console.error('Farmer ID, Start date, and End date are required');
      return;
    }

    this.farmerService.trackTransactions(this.farmerId, this.startDate, this.endDate).subscribe(
      (data: any[]) => {
        if (!data || data.length === 0) {
          console.warn('No transactions found in the given range.');
          return;
        }

        this.transactions = data;
      },
      (error: any) => console.error('Error fetching transactions:', error)
    );
  }

  /** Publish New Crop */
  publishNewCrop() {
    if (this.farmerId === 0) {
      console.error('Farmer ID is missing. Cannot publish crop.');
      return;
    }

    if (!this.newCrop.name || this.newCrop.quantity <= 0 || this.newCrop.price <= 0) {
      console.error('Please fill out all crop details correctly.');
      return;
    }

    const cropData = { ...this.newCrop, farmerId: this.farmerId };
    console.log('CropData', cropData);

    this.farmerService.publishCrop(cropData).subscribe(
      (response: any) => {
        console.log('Crop published successfully', response);
        this.loadCrops();
        this.newCrop = { name: '', quantity: 0, price: 0 };
      },
      (error: any) => console.error('Error publishing crop', error)
    );
  }
}
