import { Component } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { RecetasService } from '../../services/recetas.service';

@Component({
  selector: 'app-admin-receetas',
  templateUrl: './admin-receetas.component.html',
  styleUrl: './admin-receetas.component.scss'
})
export class AdminReceetasComponent {

  
 
  loadingChildren = true;
  childrenLoadedCount = 0;
  totalChildren = 1; // Porque tenés 3 componentes hijos



  onChildLoaded() {
    this.childrenLoadedCount++;
    if (this.childrenLoadedCount === this.totalChildren) {
      this.loadingChildren = false;
    }
  }


}
