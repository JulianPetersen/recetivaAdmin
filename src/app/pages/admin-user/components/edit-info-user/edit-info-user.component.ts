import { Component, Inject } from '@angular/core';
import { InfoUsersService } from '../../../../services/info-users.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GlobalService } from '../../../../services/global.service';
import { Router } from 'express';
import { AdminUserRequest, AdminUserResponse } from '../../../../models/user';

@Component({
  selector: 'app-edit-info-user',
  templateUrl: './edit-info-user.component.html',
  styleUrl: './edit-info-user.component.scss'
})
export class EditInfoUserComponent {

  userId:string;
  userEdit:AdminUserRequest = {};
  constructor(@Inject(MAT_DIALOG_DATA) public data:any, 
              public infoUser:InfoUsersService,
              private dialogRef: MatDialogRef<EditInfoUserComponent>){
    
  }

  ngOnInit(){
    this.userId = this.data
    this.getInfoUserById();
  }


  editUser(){
    this.infoUser.updateUser(this.userId,this.userEdit)
      .subscribe({
        next: ((res:AdminUserResponse) => {
          console.log(res)
        }),
        error:((err) => {
          console.log(err)
        })
      })
  }

  getInfoUserById(){
    this.infoUser.getInfoUserAdminById(this.userId)
      .subscribe({
        next:((res:AdminUserResponse) => {
          this.userEdit.name = res.name
          this.userEdit.lastName = res.lastName,
          this.userEdit.matricula = res.matricula
        }),
        error:((err) => {
          console.log(err);
        })
      })
  }

  cancel() {
    this.dialogRef.close();
  }
}
