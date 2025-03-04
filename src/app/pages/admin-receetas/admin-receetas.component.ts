import { Component } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { RecetasService } from '../../services/recetas.service';

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

  constructor(){}

  ngOnInit(){

  }


}
