import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

interface LoginResponse {
  user: {
    userId: number;
    username: string;
    email: string;
  };
  role: {
    roleId: number;
    roleName: string;
  };
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:5096/api/Accounts/login';
  private signupUrl = 'http://localhost:5096/api/Accounts/signup';

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Register a new user
   * @param userData - User registration data
   * @returns Observable<any>
   */
  register(userData: any): Observable<any> {
    return this.http.post<any>(this.signupUrl, userData);
  }

  /**
   * Login the user with email and password
   * @param credentials - { email: string, password: string }
   * @returns Observable<LoginResponse>
   */
  login(credentials: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginUrl, credentials).pipe(
      tap((response: LoginResponse) => {
        if (response?.token) {
          localStorage.setItem('token', response.token);  // ✅ Store token
          localStorage.setItem('role', response.role.roleName); // ✅ Store roleName
          localStorage.setItem('userId', response.user.userId.toString()); // ✅ Store userId
          this.isLoggedInSubject.next(true);
        }
      })
    );
  }

  /**
   * Get the stored authentication token
   * @returns string | null
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Logout the user and clear storage
   */
  logout(): void {
    localStorage.clear();
    this.isLoggedInSubject.next(false);
  }

  /**
   * Check if user has a valid token
   * @returns boolean
   */
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  /**
   * Get the logged-in user's role
   * @returns string | null
   */
  getUserRole(): string | null {
    return localStorage.getItem('role');
  }


  getUserDetails(){
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
