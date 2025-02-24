import { Component } from '@angular/core';
import { GlobalService } from '../../../../services/global.service';
import { RecetasService } from '../../../../services/recetas.service';
import { Recetas } from '../../../../models/recetas';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../../../components/ui/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-list-recetas',
  templateUrl: './list-recetas.component.html',
  styleUrl: './list-recetas.component.scss'
})
export class ListRecetasComponent {

  allRecetas:Recetas[] = [];


  constructor(private global:GlobalService, 
              private receta:RecetasService,
              private dialog:MatDialog,
  ){

  }


  ngOnInit(){
    this.getAllRecetas();
  }


  getAllRecetas(){
    this.receta.getAllRecetas()
      .subscribe({
        next: ((res:Recetas[]) => {
          this.allRecetas = res;
          console.log(this.allRecetas)
        }),
        error: ((err) => {
          console.log(err)
        })
      })
  }


  deleteReceta(id:string){
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
       data:id,
       width: '250px',
     });
     dialogRef.afterClosed().subscribe(result => {
       console.log(`Dialog result: ${result}`);
       if(result == true){
         this.receta.deleteReceta(id)
         .subscribe({
           next: ((res)=> {
             this.getAllRecetas();
             console.log(res)
           }),
           error:((err)=>{
             console.log(err);
           })
         })
       }
     });
   }
}
