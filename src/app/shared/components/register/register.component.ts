import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/Auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form:FormGroup;
   returnUrl='/developer/step-one'
  constructor(private router:Router,private builder:FormBuilder, private authService: AuthService ){
    this.form = this.builder.group({
      Email: ["", [Validators.required, Validators.email]],
      FirstName:["",[Validators.required,Validators.minLength(4)]],
      LastName:["",[Validators.required,Validators.minLength(4)]],

      UserName:["",[Validators.required,Validators.pattern(/^\S*$/),Validators.minLength(8)]],
      // phonenumber:["",[Validators.required,Validators.pattern(/^\d{11}$/)]],

      Password: ["", [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/)]],
      ConfirmPassword: ["", [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/)]],
      Role: [''],
      //Role: ['', Validators.required]

    
  })
}
// send() {
//   console.log(this.form.value);
// }
setRole(Role: string) {
  this.form.patchValue({ Role: Role });
}

// register() {
//   if (this.form.valid) {
//     this.authService.register(this.form.value).subscribe({
//       next: (response) => console.log(response),
//       error: (error) => console.error(error)
//     });
//   }
// }
// }
send() {
  this.authService.register(this.form.value).subscribe({
    next:(res:any)=>{
      console.log(res);
      
      if(res.Success == true){
        this.authService.userlogin(res.Result)
        this.router.navigateByUrl(this.returnUrl)

      }
      
    },
    error:(err)=>{
      console.log(err);
      alert("Sorry try again leter")
    }
  })
}
}