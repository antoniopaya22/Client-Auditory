import { Component, OnInit, ViewChild } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { UserService } from './services/user/user.service';

/**
 * App component
 */
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {
  size: boolean = false;
  showSubmenu: boolean = false;

  menuItemHandler(): void {
    this.showSubmenu = !this.showSubmenu;
  }

  /**
   * Constructor
   * @param {Platform} platform
   * @param {SplashScreen} splashScreen
   * @param {statusBar} StatusBar
   * @param {Router} router
   * @param {UserService} userApi
   * @param {MenuController} menuCtrl
   */
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private userApi: UserService,
    private menuCtrl: MenuController
  ) {
    this.initializeApp();
  }


  /**
   * OnInit
   */
  ngOnInit(): void {
    if (window.innerWidth > 760) {
      this.size = true;
    }
    if (!this.userApi.isLoggedIn()) {
      this.menuCtrl.enable(false);
    }
    else {
      this.menuCtrl.enable(true);
    }
  }

  /**
   * Inicializa la aplicacion
   */
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  /**
   * Cierra la sesion del usuario
   */
  logout() {
    this.userApi.logout();
    this.router.navigate(['/']);
  }

  /**
   * Comprueba si se está ejecutando en un dispositivo movil o no
   */
  esMovil(){
    if(this.platform.is('mobileweb') || this.platform.is('mobile')) {
      return true;
    } else {
      return false;
    }
  }
}
