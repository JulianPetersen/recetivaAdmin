import { Component } from '@angular/core';
import { GlobalService } from '../../../../services/global.service';
import { RecetasService } from '../../../../services/recetas.service';
import { Recetas } from '../../../../models/recetas';

@Component({
  selector: 'app-list-recetas',
  templateUrl: './list-recetas.component.html',
  styleUrl: './list-recetas.component.scss'
})
export class ListRecetasComponent {

  allRecetas:Recetas[] = [];


  constructor(private global:GlobalService, private receta:RecetasService){

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
          console.log(this.allRecetas[0].img); 
        }),
        error: ((err) => {
          console.log(err)
        })
      })
  }


}
