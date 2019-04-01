import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Platform,MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private loginform: FormGroup;


  constructor(
    public menuCtrl: MenuController,
    private formBuilder: FormBuilder,
    private userApi: UserService,
    private router: Router,
    private platform: Platform
    ) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.loginform = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    }
    );
  }

  login() {
    if (this.loginform.invalid) {
      return;
    }
    const data = {
      userName: this.loginform.value['user'],
      password: this.loginform.value['password']
    };

    this.userApi.login(data).subscribe(res => {
      this.userApi.setToken(res);
      this.menuCtrl.enable(true);
      this.router.navigate(['/home'], { replaceUrl: true });
    },
      err => {
        console.log(err);
      });
  }

  esMovil(){
    if(this.platform.is('mobileweb') || this.platform.is('mobile')) {
      return true;
    } else {
      return false;
    }
  }

}