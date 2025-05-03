import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeleteDialogComponent } from '../../../../components/ui/delete-dialog/delete-dialog.component';
import { AdminUserResponse } from '../../../../models/user';
import { GlobalService } from '../../../../services/global.service';
import { InfoUsersService } from '../../../../services/info-users.service';
import { EditInfoUserComponent } from '../edit-info-user/edit-info-user.component';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss'
})
export class ListUsersComponent {

  listUSers:AdminUserResponse[]=[];
  searchText: string = '';
  @Output() loaded = new EventEmitter<void>();
  

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
          this.loaded.emit();
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
        this.infoUsers.updateUser(id,body)
        .subscribe({
          next:((res => {
            console.log(res)
            this.getInfoUsers()
          })),
          error: ((err) => {
            console.log(err);
          })
        })
      }
    });
  }


  activeUser(id:string){
    let body = {
      isActive:true,
  }
    this.global.showAlertWhitFunction('ATENCION', '¿Quiere volver a activar este usuario?',() => {
      this.infoUsers.updateUser(id,body)
        .subscribe({
          next: ((res) => {
            console.log(res);
            this.getInfoUsers();
          }),
          error: ((err) => {
            console.log(err);
          })
        })
    })
  }

  
onSearch() {
  if(this.searchText == ''){
    this.getInfoUsers();
  }else{
    console.log(this.searchText)
    this.infoUsers.getUserByEmail(this.searchText)
     .subscribe({
       next: ((res:AdminUserResponse[]) => {
         console.log(res);
         this.listUSers = res
       }),
       error: ((err) => {
         console.log(err)
         this.listUSers = []
       })
     })
  }

}


editInfoUser(id:string){
  this.dialog.open(EditInfoUserComponent, {
    data:id,

  });
}
}



