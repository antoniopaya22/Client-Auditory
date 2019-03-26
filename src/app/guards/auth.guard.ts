import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { UserService } from '../api/user.service';
import { MenuController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  constructor(private userApi: UserService, private router: Router) { }
  canActivate() {
    // If the user is not logged in we'll send them back to the home page

    if (!this.userApi.isLoggedIn()) {

      console.log('No estás logueado');
      this.router.navigate(['/']);
      return false;
    }
  
    return true;

  }
}
