import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../api/user.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private loginform: FormGroup;



  constructor(public menuCtrl: MenuController, private formBuilder: FormBuilder, private userApi: UserService, private router: Router) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.loginform = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['',Validators.required]
    }
    );
  }

  login() {
    console.log('login');

    const data = {
      userName: this.loginform.value['user'],
      password: this.loginform.value['password']
    };

    this.userApi.login(data).subscribe(res => {

      console.log("Login done"+res);
      this.userApi.setToken(res);
      this.menuCtrl.enable(true);
      this.router.navigate(['/home']);
    },
      err => {
        console.log(err);
      });

  }

}
