import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  constructor(private userApi: UserService, private router: Router) { }
  canActivate() {
    // Si el usuario no esta logueado se le redirigira a la pagina de login
    if (!this.userApi.isLoggedIn()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
