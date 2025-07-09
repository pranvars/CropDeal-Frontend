import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DealerService {
  private baseUrl = 'http://localhost:5201/api/Dealer';
  private transactionApiUrl = 'http://localhost:5113/api/Transaction/dealer?dealerId=';
  private createTransactionUrl = 'http://localhost:5113/api/Transaction';

  constructor(private http: HttpClient) {}

  /** Helper Method to Get Headers with JWT Token **/
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Attach token for authentication
    });
  }

  /** Get Dealer ID by User ID **/
  getDealerId(userId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/getDealerId/${userId}`, { headers: this.getHeaders() });
  }

  /** Get Dealer Profile by Dealer ID **/
  getDealerById(dealerId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${dealerId}`, { headers: this.getHeaders() });
  }

  /** Update Dealer Profile **/
  updateDealer(dealerId: number, dealerData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${dealerId}`, dealerData, { headers: this.getHeaders() });
  }

  /** Get All Crops **/
  getAllCrops(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:5077/api/Crops', { headers: this.getHeaders() });
  }

  /** Buy Crop - Create Transaction **/
  createTransaction(transactionData: any): Observable<any> {
    return this.http.post(this.createTransactionUrl, transactionData, { headers: this.getHeaders() });
  }

  /** Get Transactions for a Dealer **/
  getTransactionsByDealer(dealerId: number, startDate: string, endDate: string): Observable<any[]> {
    const url = `${this.transactionApiUrl}${dealerId}&startDate=${startDate}&endDate=${endDate}`;
    return this.http.get<any[]>(url, { headers: this.getHeaders() });
  }
}
