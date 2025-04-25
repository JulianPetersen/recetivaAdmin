import { Component, EventEmitter, Output } from '@angular/core';
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
    if(this.verificateData()){
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
    
  }

  verificateData(){
    if(this.newUser.email == "" || this.newUser.email == undefined){
      this.global.showAlert('Error','Debes ingresar un email para Agregar el usuario')
      return false
    }
    if(this.newUser.password == "" || this.newUser.password == undefined){
      this.global.showAlert('Error','Debes ingresar una contraseña para Agregar el usuario')
      return false
    }
    if(this.newUser.roles.length == 0 ){
      this.global.showAlert('Error','Debes asignarle un rol al Usuario')
      return false
    }
    return true
  }


  clearForm() {
    this.newUser = {
      email: "",
      password: "",
      roles: []
    };
    this.selectedRole = "";
  }
}
