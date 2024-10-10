import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../services/Auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
    isuserExist:boolean = false
  constructor(private router: Router,private authServ:AuthService) {
      this.authServ.userlogin(this.authServ.getToken()??"")
      this.authServ.isloggedUserSubject.subscribe(value=>{
      this.isuserExist = value
      })
    }



  onclick() {
    this.router.navigate(['/aboutus']);
  }
  logout(){
    this.authServ.userlogout()
  }




}
