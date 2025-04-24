import { Component } from '@angular/core';
import { User } from '../../../../models/user';
import { AuthService } from '../../../../services/auth.service';
import { GlobalService } from '../../../../services/global.service';

@Component({
  selector: 'app-form-add-user',
  templateUrl: './form-add-user.component.html',
  styleUrl: './form-add-user.component.scss'
})
export class FormAddUserComponent {

 platform:string = "web" 
 selectedRole:string;
  newUser:User = {
    email: "",
    password:"",
    roles:[]
  };

  constructor(private auth:AuthService, private global:GlobalService){

  }

  ngOnInit(){

  }

  roleSelected(){
    this.newUser.roles.push(this.selectedRole);
  }

  createNewUser(){
    this.auth.register(this.newUser,this.platform)
      .subscribe({
        next:((res:any) => {
          console.log(res)
          this.clearForm()
          this.global.showAlert('Usuario Agregado',`${res.user.email} Agregado correctamente`)
        }),
        error: ((err) => {
          console.log(err)
          this.clearForm();
          this.global.showAlert('Error',`Algo fallo al intentar agregar Usuario ${err.error.message}`)
        })
      })
  }


  clearForm(){
    this.newUser = {
      email:"",
      password:"",
    }
    this.selectedRole=""
  }
}
