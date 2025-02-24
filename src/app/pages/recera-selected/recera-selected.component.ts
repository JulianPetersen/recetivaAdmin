import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecetasService } from '../../services/recetas.service';
import { Recetas } from '../../models/recetas';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-recera-selected',
  templateUrl: './recera-selected.component.html',
  styleUrl: './recera-selected.component.scss'
})
export class ReceraSelectedComponent {
  
  recetaId:string | null = null
  recetaSelected:Recetas;
  recetaTexto:string = "asd";
  sanitisedHtml:any;

  constructor(private params:ActivatedRoute,
              private receta:RecetasService,
              private sanitizer: DomSanitizer){}



  ngOnInit(){
    this.obtainRecetaId();
    this.getRecetaSelected()
  }


  obtainRecetaId(){
    this.params.queryParams.subscribe(params => {
      this.recetaId = params['recetaId'];  // Obtienes el valor de recetaId
      
    });
  }

  getRecetaSelected(){
    this.receta.getRecetasById(this.recetaId)
      .subscribe({
        next: ((res:Recetas) => {
          this.recetaSelected = res;
          this.sanititizedHtml(res.instrucciones)
        }),
        error : (err => {
          console.log(err)
        }) 
      })
  }

  sanititizedHtml(html:any){
    this.sanitisedHtml = this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
