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
  if(this.validateData()){
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


  validateData(){
    if(this.recetaTitle == "" || this.recetaTitle == undefined){
      this.global.showAlert('Error','Debes ingresar un titulo para la receta')
      return false
    }
    if(this.recetaIngredientes == "" || this.recetaIngredientes == undefined){
      this.global.showAlert('Error','Debes ingresar al menos un ingrediente')
      return false
    }
    if(this.fileSelected == undefined){
      this.global.showAlert('Error','Debes seleccionar una imagen')
      return false
    }
    if(this.recetaInstrucciones == "" || this.recetaInstrucciones == undefined){
      this.global.showAlert('Error','Debes especificar las instrucciones de tu receta.')
    }
    return true
  }
}
