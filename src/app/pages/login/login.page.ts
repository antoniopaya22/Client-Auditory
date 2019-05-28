import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Platform, MenuController } from '@ionic/angular';
import * as jwt_decode from "jwt-decode";

/**
 * Login page
 */
@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    private loginform: FormGroup;
    public error_inicio: boolean;
    public userValue: String;
    public passValue: String;


    /**
   * Constructor
   * @param {MenuController} menuCtrl
   * @param {FormBuilder} formBuilder
   * @param {UserService} userApi
   * @param {Router} router
   * @param {Platform} platform
   */
    constructor(
        public menuCtrl: MenuController,
        private formBuilder: FormBuilder,
        private userApi: UserService,
        private router: Router,
        private platform: Platform
    ) {
        this.userValue = '';
        this.passValue = '';
    }

    ionViewWillEnter() {
        this.menuCtrl.enable(false);
    }

    /**
     * OnInit
     */
    ngOnInit() {
        this.loginform = this.formBuilder.group({
            user: ['', Validators.required],
            password: ['', Validators.required]
        }
        );
    }

    /**
     * Login
     */
    login() {
        if (this.loginform.invalid) {
            return;
        }
        const data = {
            userName: this.loginform.value['user'],
            password: this.loginform.value['password']
        };

        this.userApi.login(data).subscribe(res => {
            let rol = jwt_decode(res).rol;
            if (rol === "auditor") {
                this.userApi.setToken(res);
                this.menuCtrl.enable(true);
                this.router.navigate(['/home'], { replaceUrl: true });
            } else {
                this.error_inicio = true;
                this.userValue = '';
                this.passValue = '';
            }
        },
            err => {
                this.error_inicio = true;
                this.userValue = '';
                this.passValue = '';

            });
    }

    /**
   * Comprueba si se está ejecutando en un dispositivo movil o no
   */
    esMovil() {
        if (this.platform.is('mobileweb') || this.platform.is('mobile')) {
            return true;
        } else {
            return false;
        }
    }

}