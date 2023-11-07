import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private toastController: ToastController
  ) {}

  validCredentials = [
    { username: 'admin', password: '123' },
    { username: 'admin2', password: '234' },
    { username: 'saulelcaneloalvarez', password: 'cuernoasulado' },
  ];

  async login() {
    const validCredential = this.validCredentials.find(
      (cred) =>
        cred.username === this.username && cred.password === this.password
    );

    if (validCredential) {
      this.router.navigate(['/tabs']);
    } else {
      const toast = await this.toastController.create({
        message: 'Usuario o contraseña inválidos. Inténtalo de nuevo.',
        duration: 2000,
        position: 'bottom',
      });
      toast.present();
    }
    this.username = '';
    this.password = '';
  }
}
