import { Component } from '@angular/core';
import { GlobalService } from '../../../../services/global.service';
import { RecetasService } from '../../../../services/recetas.service';
import { recetaResponse, Recetas  } from '../../../../models/recetas';

@Component({
  selector: 'app-create-receta',
  templateUrl: './create-receta.component.html',
  styleUrl: './create-receta.component.scss'
})
export class CreateRecetaComponent {
  
  fileSelected:any

  recetaTitle:string;
  recetaIngredientes:string;
  recetaInstrucciones:string;


constructor(private global:GlobalService, private recetas:RecetasService){}


  createReceta(){
    if(this.validateData()){
      let newReceta:Recetas = {
        title:this.recetaTitle,
        arrayIngredientes:this.recetaIngredientes,
        img:this.fileSelected.fileRaw,
        instrucciones:this.recetaInstrucciones,
      }
    
      // console.log(newReceta);
      this.recetas.createReceta(newReceta)
        .subscribe({
          next: ((res:recetaResponse) => {
            console.log(res);
            this.clearForm()
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


    clearForm(){
      this.recetaTitle = "";
      this.recetaIngredientes = "";
      this.recetaInstrucciones = "";
      this.fileSelected = ""
      
    }
}
