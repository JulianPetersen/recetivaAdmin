import { Component } from '@angular/core';
import { categorieReceta } from '../../../../models/categories';
import { CategoriesService } from '../../../../services/categories.service';
import { GlobalService } from '../../../../services/global.service';

@Component({
  selector: 'app-form-add-categorie',
  templateUrl: './form-add-categorie.component.html',
  styleUrl: './form-add-categorie.component.scss'
})
export class FormAddCategorieComponent {

  newCategorie: categorieReceta = {
    name: ""
  };

  constructor(private categorie: CategoriesService,
    private global: GlobalService) { }

  ngOnInit() { }


  createCategorie() {

    if (this.validateData()) {

      this.categorie.createCategorie(this.newCategorie)
        .subscribe({
          next: ((res: categorieReceta) => {
            console.log('Categoria agregada correctamente')
            this.categorie.notificarCambioCategoria()
            this.clearForm();
            this.global.showAlert('ATENCION', 'Categoria agregada correctamente')
          }),
          error: ((err) => {
            this.global.showAlert('ERROR', `Hubo un error al intentar agregar la categoria:${err.message}`)
          })
        })
    }

  }

  clearForm() {
    this.newCategorie.name = "";
  }

  validateData() {
    if (this.newCategorie.name == "" || this.newCategorie.name == undefined) {
      this.global.showAlert('ERROR', 'Debes agregar un nombre de categoria')
      return false
    }
    return true
  }
}
