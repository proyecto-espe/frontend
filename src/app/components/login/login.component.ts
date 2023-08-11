import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PreinscritoServiceService } from 'src/app/preinscrito-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  acceso: FormGroup = new FormGroup({
    usuario: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  })

  images1 = [
    {
      src: '../../../assets/imagenes/Sello.png',
      title: 'Sello',
      description: ''
    }
  ];

  private usserLogged: any;

  constructor(private service: PreinscritoServiceService, private router: Router) {
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
  }

  async Login() {
    const content = { username: this.acceso.get('usuario')?.value, password: this.acceso.get('password')?.value };

    try {
      await this.service.login(content).then(data => {
        this.usserLogged = JSON.stringify(data);
        localStorage.setItem('userId', this.usserLogged.idusuario);
        localStorage.setItem('user', this.usserLogged.nombreusuario);

        this.router.navigate(['dashboard-admin']);
      });
    } catch (err) {
      localStorage.removeItem('userId');
      localStorage.removeItem('user');
      console.log(err);
    }

  }
}
