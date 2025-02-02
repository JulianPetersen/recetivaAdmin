import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private auth:AuthService, private router:Router) { }

  usuario:User = {
    username:"",
    email:"",
    password:""
  };

  errorLogin:string=""

  loggin() {
    this.auth.login(this.usuario)
      .subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.token)
          this.router.navigate(['/admin'])
        },
        error: (e) => {
          this.errorLogin = e.error.message
          console.log(e.error.message)
        }
      })

  }
}
