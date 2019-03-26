import { Component, OnInit, ViewChild } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { UserService } from './api/user.service';

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

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logout() {
    this.userApi.logout();
    this.router.navigate(['/']);
  }
}
