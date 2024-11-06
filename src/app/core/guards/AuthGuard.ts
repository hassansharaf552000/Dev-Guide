import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../shared/services/Auth/auth.service';
import { ToastrService } from 'ngx-toastr';

export const AdminGuard: CanActivateFn = (route, state) => {
  console.log(state.url);
  const toaster = inject(ToastrService)
  const serv = inject(AuthService)
  const router = inject(Router)
  let role = serv.getStoredRole()
  let token = serv.getToken()
  console.log(role, token);
  if (token != null && role != null && role == "Admin") {
    return true;
  }
  else {
    router.navigate(['/login', state.url])
    alert('Sorry You Can NOT See This Page')
 
    return false;
  }
};
export const DeveloperGuard: CanActivateFn = (route, state) => {
  console.log(state.url);
  const serv = inject(AuthService)
  const router = inject(Router)
  const toaster = inject(ToastrService)
  let role = serv.getStoredRole()
  let token = serv.getToken()
  console.log(role, token);
  if (token != null && role != null && role == "Developer") {
    return true;
  }
  else {

    router.navigate(['/login', state.url])
    alert('Sorry You Can NOT See This Page')
    return false;
  }
};

export const MentorGuard: CanActivateFn = (route, state) => {
  console.log(state.url);
  const serv = inject(AuthService)
  const toaster = inject(ToastrService)
 
  const router = inject(Router)
  let role = serv.getStoredRole()
  let token = serv.getToken()
  console.log(role, token);
  if (token != null && role != null && role == "Mentor") {
    return true;
  }
  else {
 
    router.navigate(['/login', state.url])
    alert('Sorry You Can NOT See This Page')
    
    return false;
  }
};

export const HRGuard: CanActivateFn = (route, state) => {
  console.log(state.url);
  const toaster = inject(ToastrService)
  const serv = inject(AuthService)
  const router = inject(Router)
  let role = serv.getStoredRole()
  let token = serv.getToken()
  console.log(role, token);
  if (token != null && role != null && role == "HR") {
    return true;
  }
  else {
  
    router.navigate(['/login', state.url])
    alert('Sorry You Can NOT See This Page')
    return false;
    
  }
  
};


