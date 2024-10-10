import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/Auth/auth.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
      // // Get the auth token from Cookies
      let authServ = inject(AuthService)
      let authToken = authServ.getToken()
      
      // If the token exists, clone the request and add the Authorization header
      if (authToken) {
        const authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${authToken}`
          }
        });
        // Pass the modified request to the next handler
        return next(authReq);
      }

      // If no token is present, pass the original request
      return next(req);
};
