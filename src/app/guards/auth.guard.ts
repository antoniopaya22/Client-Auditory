import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root'
})

/**
 * Auth Guard
 */
export class AuthGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  /**
   * Constructor
   * @param {Router} router
   * @param {UserService} userApi
   */
  constructor(private userApi: UserService, private router: Router) { }

  /**
   * Redirige a la pagina de login en caso de que el usuario no
   * este logueado.
   * 
   * @return true si el usuario esta logueado, falso en caso contrario
   */
  canActivate() {
    // Si el usuario no esta logueado se le redirigira a la pagina de login
    if (!this.userApi.isLoggedIn()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
