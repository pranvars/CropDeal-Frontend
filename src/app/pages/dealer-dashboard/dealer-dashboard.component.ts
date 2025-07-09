import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DealerService } from '../../services/dealer.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dealer-dashboard',
  standalone: false,
  templateUrl: './dealer-dashboard.component.html',
  styleUrls: ['./dealer-dashboard.component.css']
})
export class DealerDashboardComponent implements OnInit {
  crops: any[] = [];
  transactions: any[] = [];
  dealerId: number = 0;
  userId: number = 0;

  startDate: string = '';
  endDate: string = '';

  dealer: any = {
    location: '',
    accountNumber: '',
    bankIfscCode: ''
  };

  // Modal Data
  selectedTransaction: any = null;
  showModal = false;

  // Toggle Variables
  showProfile = false;
  showViewCrops = false;
  showTransactions = false;

  constructor(
    private dealerService: DealerService,
    private authService: AuthService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    let user = JSON.parse(sessionStorage.getItem('user') || '{}');
    
    if (user && user.userId) {
      this.userId = user.userId;
      this.fetchDealerId(this.userId);
    } else {
      console.error('User ID not found in session.');
    }
  }

  /** Fetch Dealer ID using User ID */
  fetchDealerId(userId: number) {
    this.dealerService.getDealerId(userId).subscribe(
      (id: number) => {
        if (!id) {
          console.error('Dealer ID not found for User ID:', userId);
          return;
        }

        this.dealerId = id;
        console.log('Dealer ID Retrieved:', this.dealerId);
        this.cdRef.detectChanges();
        
        this.loadCrops();
        this.loadDealerProfile();
      },
      (error: any) => console.error('Error fetching Dealer ID:', error)
    );
  }

  /** Load Dealer Profile */
  loadDealerProfile() {
    if (this.dealerId === 0) {
      console.error('Invalid Dealer ID. Cannot fetch profile.');
      return;
    }

    this.dealerService.getDealerById(this.dealerId).subscribe(
      (data: any) => {
        if (!data) {
          console.error('Dealer profile not found.');
          return;
        }
        console.log('Dealer Profile:', data);
        this.dealer = {
          location: data.location || '',
          accountNumber: data.accountNumber || '',
          bankIfscCode: data.bankIfsccode || ''
        };
        console.log('Dealer Profile Loaded:', this.dealer);
      },
      (error: any) => console.error('Error fetching dealer profile:', error)
    );
  }

  /** Update Dealer Profile */
  updateDealerProfile() {
    if (!this.dealer.location || !this.dealer.accountNumber || !this.dealer.bankIfscCode) {
      console.error('Please enter valid profile details.');
      return;
    }

    if (this.userId === 0 || this.dealerId === 0) {
      console.error('Missing User ID or Dealer ID. Cannot update profile.');
      return;
    }

    const updatedDealer = {
      userId: this.userId,
      dealerId: this.dealerId,
      location: this.dealer.location,
      accountNumber: this.dealer.accountNumber,
      bankIfscCode: this.dealer.bankIfscCode
    };

    this.dealerService.updateDealer(this.dealerId, updatedDealer).subscribe(
      (response: any) => {
        console.log('Profile updated successfully', response);
        alert('Profile updated successfully!');
      },
      (error: any) => console.error('Error updating profile:', error)
    );
  }

  /** Buy Crop */
  buyCrop(crop: any): void {
    if (!crop) {
      console.error('Invalid crop selected.');
      return;
    }

    const transactionData = {
      dealerId: this.dealerId,
      farmerId: crop.farmerId,
      cropId: crop.cropId,
      cropName: crop.name,
      quantity: crop.quantity,
      totalAmount: crop.quantity * crop.price, // Assuming price per unit
      transactionStatus: true,
      transactionDate: new Date().toISOString()
    };
    console.log('Transaction Data:', transactionData);

    this.dealerService.createTransaction(transactionData).subscribe(
      () => {
        alert('Crop purchased successfully!');
        this.loadTransactions(); // Refresh transaction history
      },
      (error: any) => console.error('Error purchasing crop:', error)
    );
  }

  /** Toggle Section Visibility */
  toggleSection(section: string) {
    this.showProfile = section === 'profile' ? !this.showProfile : false;
    this.showViewCrops = section === 'viewCrops' ? !this.showViewCrops : false;
    this.showTransactions = section === 'transactions' ? !this.showTransactions : false;
  }

  /** Load Crops */
  loadCrops() {
    this.dealerService.getAllCrops().subscribe(
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
    if (!this.startDate || !this.endDate || this.dealerId === 0) {
      console.error('Dealer ID, Start date, and End date are required');
      return;
    }

    this.dealerService.getTransactionsByDealer(this.dealerId, this.startDate, this.endDate).subscribe(
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

  /** Open Receipt Modal */
  openReceiptModal(transaction: any) {
    if (!transaction) {
      console.error('Invalid transaction selected.');
      return;
    }

    this.selectedTransaction = transaction;
    this.showModal = true;
  }

  /** Close Receipt Modal */
  closeReceiptModal() {
    this.selectedTransaction = null;
    this.showModal = false;
  }
}
