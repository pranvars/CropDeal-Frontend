import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
 
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private farmerApiUrl = 'http://localhost:5159/api/Farmer';
  private dealerApiUrl = 'http://localhost:5201/api/Dealer';
  private authApiUrl = 'http://localhost:5096/api/Accounts';
 
  constructor(private http: HttpClient) {}

   /** Helper Method to Get Headers with JWT Token **/
   private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Attach token for authentication
    });
  }
  
  getAllFarmers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.farmerApiUrl}/all`, { headers: this.getHeaders() });
  }
 
  getAllDealers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.dealerApiUrl}/all`, { headers: this.getHeaders() });
  }
 
  getUsername(userId: number): Observable<string> {
    return this.http.get<{ username: string }>(`${this.authApiUrl}/GetUsername/${userId}`)
      .pipe(map(response => response.username)); // ✅ Extract just the username
  }
 
  updateFarmerStatus(farmerIds: number[], newStatus: boolean): Observable<any> {
    console.log(farmerIds);
    return this.http.put(`${this.farmerApiUrl}/update-status?isActive=${newStatus}`,
        [farmerIds],
        { headers: this.getHeaders() }
    );
  }
 
  updateDealerStatus(dealerId: number[], newStatus: boolean): Observable<any> {
    return this.http.put(`${this.dealerApiUrl}/update-status?isActive=${newStatus}`,
        [dealerId],
        { headers: this.getHeaders() });
  }
}
 
 