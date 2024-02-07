import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route, state) => {
  const oauthService: AuthService = inject(AuthService);
    
  if (oauthService.getToken() ) {
 
    return true;
  }
  oauthService.redirectIndex();
  return false;
};

