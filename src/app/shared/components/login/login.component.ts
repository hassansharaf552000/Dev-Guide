import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Import the Router for navigation
import { AuthService } from '../../services/Auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],  // Corrected 'styleUrl' to 'styleUrls'
})
export class LoginComponent implements OnInit {
  loginMethod: string = '';  // Holds either the username or email
  password: string = '';
  rememberMe: boolean = false;  // Flag for Remember Me
  errorMessage: string = '';  // Error message for login failures
  successMessage: string = '';  // Success message for login successes
  passwordVisible: boolean = false;
  form:FormGroup;
  returnUrl='/home'
  constructor(private authService: AuthService, private router: Router,private builder:FormBuilder) { 
    this.form = this.builder.group({
      LoginMethod: ["", [Validators.required]],
      Password: ["", [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/)]],})
   }
  ngOnInit(): void {

  }
  

  
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;  // Toggle the visibility
  }


login() {
 
  this.authService.login(this.form.value).subscribe({
    next:(res:any)=>{
      console.log(res.Result);
      
      if(res.Success == true){
        this.authService.userlogin(res.Result);
        this.router.navigateByUrl(this.returnUrl)

      }else{
        alert("Sorry try again leter")
      }
      
    },
    error:(err)=>{
      console.log(err);
      alert("Sorry try again leter")
    }
  })

}
}