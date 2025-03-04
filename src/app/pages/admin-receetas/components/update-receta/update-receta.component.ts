import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecetasService } from '../../../../services/recetas.service';
import { recetaResponse, Recetas } from '../../../../models/recetas';
import { GlobalService } from '../../../../services/global.service';

@Component({
  selector: 'app-update-receta',
  templateUrl: './update-receta.component.html',
  styleUrl: './update-receta.component.scss'
})
export class UpdateRecetaComponent {


  recetaId:string | null = null
  recetaObtained:recetaResponse
  fileSelected:any
  ingredientesRecibed:string



  constructor(private params:ActivatedRoute,
              private receta:RecetasService,
              private global:GlobalService
  ){}
 

  
  ngOnInit(){
    this.obtainRecetaId();
    this.obtainesReceta()
  }

  obtainRecetaId(){
    this.params.queryParams.subscribe(params => {
      this.recetaId = params['recetaId'];  // Obtienes el valor de recetaId
      console.log('la receta es',this.recetaId)
    });
  }



  obtainesReceta(){
    this.receta.getRecetasById(this.recetaId)
      .subscribe({
        next: ((res:recetaResponse) => {
          this.recetaObtained = res;
          this.ingredientesRecibed = res.arrayIngredientes.join(',')
          console.log('Ingredientes recibed',this.ingredientesRecibed)
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


  updateReceta(){
    if(this.validateData()){

      if(!this.fileSelected){
        let receta:Recetas = {
          title:this.recetaObtained.title,
          arrayIngredientes: this.ingredientesRecibed,
          instrucciones:this.recetaObtained.instrucciones,
         }
         this.receta.updateReceta(this.recetaObtained._id,receta)
          .subscribe({
            next:((res:any) => {
              console.log(res);
            }),
            error:(err => {
              console.log(err);
            })
          })
      }else{
        let receta:Recetas = {
          title:this.recetaObtained.title,
          arrayIngredientes: this.ingredientesRecibed,
          instrucciones:this.recetaObtained.instrucciones,
         }
         this.receta.updateReceta(this.recetaObtained._id,receta,this.fileSelected.fileRaw)
          .subscribe({
            next:((res:any) => {
              console.log(res);
            }),
            error:(err => {
              console.log(err);
            })
          })
      }
    }
  } 
 

  validateData(){
    if(this.recetaObtained.title == "" || this.recetaObtained.title == undefined){
      this.global.showAlert('Error','Debes ingresar un titulo para la receta')
      return false
    }
    if(this.ingredientesRecibed == "" || this.ingredientesRecibed == undefined){
      this.global.showAlert('Error','Debes ingresar al menos un ingrediente')
      return false
    }
    if(this.recetaObtained.instrucciones == "" || this.recetaObtained.instrucciones){
      this.global.showAlert('Error','Debes especificar las instrucciones de tu receta.')
    }
    return true
  }
}
 