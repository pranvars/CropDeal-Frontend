import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FarmerService {
  private baseUrl = 'http://localhost:5077/api/Crops';
  private apiUrl1 = 'http://localhost:5159/api/Farmer/';
  private apiUrl2 = 'http://localhost:5159/api/Farmer/publish-crop';
  private apiUrl3 = 'http://localhost:5113/api/Transaction/farmer?farmerId=';
  private apiUrl4 = 'http://localhost:5159/api/Farmer/getFarmerId/'; // API for fetching FarmerId
  private apiUrl5 = 'http://localhost:5159/api/Farmer/'; // API for fetching Farmer Profile

  constructor(private http: HttpClient) {}

  /** Helper Method to Get Headers with JWT Token **/
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Attach token for authentication
    });
  }

  /** 1. Get FarmerId by UserId **/
  getFarmerId(userId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl4}${userId}`, { headers: this.getHeaders() });
  }

  /** 2. Get Farmer Profile by FarmerId **/
  getFarmerById(farmerId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl5}${farmerId}`, { headers: this.getHeaders() });
  }

  /** 3. Update Farmer Profile **/
  updateFarmer(farmerId: number, farmerData: any): Observable<any> {
    return this.http.put(`${this.apiUrl1}${farmerId}`, farmerData, { headers: this.getHeaders() });
  }

  /** 4. Publish Crops **/
  publishCrop(cropData: { farmerId: number; name: string; quantity: number; price: number }): Observable<any> {
    return this.http.post(this.apiUrl2, cropData, { headers: this.getHeaders() });
  }

  /** 5. Get All Crops **/
  getAllCrops(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl, { headers: this.getHeaders() });
  }

  /** 6. Track Transactions by Farmer **/
  trackTransactions(farmerId: number, startDate: string, endDate: string): Observable<any[]> {
    const url = `${this.apiUrl3}${farmerId}&startDate=${startDate}&endDate=${endDate}`;
    return this.http.get<any[]>(url, { headers: this.getHeaders() });
  }
}
