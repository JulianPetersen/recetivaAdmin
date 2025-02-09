import { Component } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { RecetasService } from '../../services/recetas.service';
import { Recetas } from '../../models/recetas';

@Component({
  selector: 'app-admin-receetas',
  templateUrl: './admin-receetas.component.html',
  styleUrl: './admin-receetas.component.scss'
})
export class AdminReceetasComponent {

  
  fileSelected:any

  recetaTitle:string;
  recetaIngredientes:string;
  recetaInstrucciones:string;

  constructor(private global:GlobalService,
              private recetas:RecetasService,
  ){}

  ngOnInit(){

  }

createReceta(){
  let newReceta:Recetas = {
    title:this.recetaTitle,
    ingredientes:this.recetaIngredientes,
    imgUrl:this.fileSelected.fileRaw,
    instrucciones:this.recetaInstrucciones,
  }

  // console.log(newReceta);
  this.recetas.createReceta(newReceta)
    .subscribe({
      next: ((res:Recetas) => {
        console.log(res);
      }),
      error: (err => {
        console.log(err);
      })
    })
}



  uploadFile(event:any){
    const [file] = event.target.files;
    this.fileSelected = {
      fileRaw :file,
      fileName: file.name
    }
    console.log(this.fileSelected.fileRaw)
    console.log(this.fileSelected.fileName)
    
  }
}
