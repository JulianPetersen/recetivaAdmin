import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeleteDialogComponent } from '../../../../components/ui/delete-dialog/delete-dialog.component';
import { AdminUserResponse } from '../../../../models/user';
import { GlobalService } from '../../../../services/global.service';
import { InfoUsersService } from '../../../../services/info-users.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss'
})
export class ListUsersComponent {

  listUSers:AdminUserResponse[]=[];

  constructor(private infoUsers:InfoUsersService,
              private dialog:MatDialog,
              private global:GlobalService,
              private router:Router){
  }

  ngOnInit(){
    this.getInfoUsers() 
  }


  getInfoUsers(){
    this.infoUsers.getInfoUsers()
      .subscribe({
        next: ((res:AdminUserResponse[]) => {
          this.listUSers = res;
          console.log(this.listUSers)
        }),
        error: ((err) => {
          console.log(err)
          this.global.showAlertWhitFunction('ERROR', `Ocurrio un error al intentar acceder a la página:${err.error.message
          }`, () => {
            this.router.navigateByUrl('login')
          })
          
        })
      })
  }

  desactivateUser(id:string){
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data:id,
      width: '250px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result == true){
        console.log('el id es',id)
        let body = {
          isActive:false,
      }
        this.infoUsers.desactivateUser(id,body)
        .subscribe({
          next:((res => {
            console.log(res)
          })),
          error: ((err) => {
            console.log(err);
          })
        })
      }
    });
  }


}

