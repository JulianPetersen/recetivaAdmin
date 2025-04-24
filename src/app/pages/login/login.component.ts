import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private auth:AuthService, private router:Router,public global:GlobalService) { }

  usuario:User = {

    email:"",
    password:""
  };

  errorLogin:string=""

  loggin() {
    this.auth.login(this.usuario)
      .subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.token)
          localStorage.setItem('userId', res.userId);
          localStorage.setItem('roles', JSON.stringify(res.roles)); // Guardar roles
          this.router.navigate(['/admin'])
          console.log(res)
        },
        error: (e) => {
          this.errorLogin = e.error.message
          console.log(e.error.message)
        }
      })
  }
}
