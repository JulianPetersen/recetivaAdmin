import { Component, Inject } from '@angular/core';
import { InfoUsersService } from '../../services/info-users.service';
import { GlobalService } from '../../services/global.service';
import { AdminUserResponse } from '../../models/user';
import { EditInfoUserComponent } from '../../pages/admin-user/components/edit-info-user/edit-info-user.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

  userId:string;
  infoUserdata:AdminUserResponse;
  constructor(private infoUser:InfoUsersService,
              private global:GlobalService,
              private dialog:MatDialog,
              private auth:AuthService){

  }

  ngOnInit(){
    this.userId = this.global.getUserIdByLocalStorage()
    this.getDataInfoUser();
  }


  getDataInfoUser(){
    this.infoUser.getInfoUserByUserId(this.userId)
      .subscribe({
        next: ((res:AdminUserResponse) => {
          this.infoUserdata = res
          console.log('LA INFORMACION DEL USUARIO ES', this.infoUserdata);
        }),
        error: ((err) => {
          console.log(err)
        })
      })
  }

  editInfoUser(id:string){
    this.dialog.open(EditInfoUserComponent, {
      data:id,
    });
  }

  logOut(){
    this.global.showAlertWhitFunction('ATENCION', '¿Estas seguro de cerrar sesion?', () => {
      this.auth.logOut();
    })
  }
}
