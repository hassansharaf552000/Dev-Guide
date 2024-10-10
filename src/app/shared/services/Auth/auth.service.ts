import { ChangePassword } from '../../change-password';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5164/api/Account/change-password'; // Your API base URL
  private loginapi = 'http://localhost:5164/api/Account/Login';
  private RegisterURL = 'http://localhost:5164/api/Account/Register';
  isloggedUserSubject: BehaviorSubject<boolean>
  private tokenKey = 'authToken'; // Name of the cookie

  constructor(private http: HttpClient,private CookieServ:CookieService) {
    this.isloggedUserSubject = new BehaviorSubject<boolean>(this.getToken()==null?false:true)
  }

  // Change password method
  ChangePasswordgit(changePassword: ChangePassword): Observable<ChangePassword> {
    return this.http.put<ChangePassword>(`${this.apiUrl}/change-password`, changePassword);
  }

  login(obj: any) {
    return this.http.post(this.loginapi, obj)
  }


  register(user: any) {
    return this.http.post(this.RegisterURL, user);
  }


  userlogin(token: string) {
    if(token=="")
    this.isloggedUserSubject.next(false)

    this.setToken(token)
    this.isloggedUserSubject.next(true)
  }
  userlogout() {
    this.removeToken()
    this.isloggedUserSubject.next(false)
  }
  // Set token in cookies
  setToken(token: string): void {
    this.CookieServ.set(this.tokenKey , token)
  }

  // Get token from cookies
  getToken(): string | null {
    return this.CookieServ.get(this.tokenKey)
  }

  // Remove token by setting its expiry date to the past
  removeToken(): void {
    this.CookieServ.delete(this.tokenKey)
  }

}







