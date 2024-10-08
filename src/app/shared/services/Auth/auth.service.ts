
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginapi = 'http://localhost:22316/api/Account/Login';


  constructor(private http: HttpClient) {}

  login(LoginMethod: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ LoginMethod, password });

    return this.http.post<any>(this.loginapi, body, { headers }).pipe(
      map(response => {
        // Check if the response indicates a successful login
        if (response.statusCode == 200 && response.token) {
          // Store the token
          localStorage.setItem('authToken', response.token);
          return response;
        } else {
          // Handle invalid login response, assuming the API returns a message
          throw new Error(response.message || 'Invalid login credentials');
        }
      }),
      catchError(this.handleError) // Handle errors like wrong login details
    );
  }

  logout(): void {
    localStorage.removeItem('authToken'); // Clear the token on logout
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';

    // If it's a client-side or network error
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // If the server returns an error response
      if (error.status === 401) {
        errorMessage = 'Invalid username or password';
      } else if (error.status === 403) {
        errorMessage = 'You are not authorized to access';
      } else if (error.status === 0) {
        errorMessage = 'The server is currently unreachable. Please try again later.';
      } else if (error.error && error.error.message) {
        // If there is an error message in the response body
        errorMessage = error.error.message;
      }
    }

    return throwError(errorMessage);
  }
}

  private RegisterURL = 'http://localhost:5164/api/Account/Register';

  constructor(private http: HttpClient) { }

  register(user: any) {
    return this.http.post(this.RegisterURL, user);
  }
}
