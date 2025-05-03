import { Component } from '@angular/core';
import { categorieReceta } from '../../../../models/categories';
import { CategoriesService } from '../../../../services/categories.service';
import { GlobalService } from '../../../../services/global.service';

@Component({
  selector: 'app-list-categorie',
  templateUrl: './list-categorie.component.html',
  styleUrl: './list-categorie.component.scss'
})
export class ListCategorieComponent {

  allCategories:categorieReceta[]=[]
  
  constructor(private categorie:CategoriesService, private global:GlobalService){}

  ngOnInit(){
    this.getAllCategories();
    this.refreshListCategories();

  }


  getAllCategories(){
    this.categorie.getAllCategories()
      .subscribe({
        next: ((res:categorieReceta[]) => {
          this.allCategories = res;
          console.log('Las categorias son',this.allCategories)
        }),
        error: ((err) => {
          console.log(err)
        })
      })
  }


  refreshListCategories(){
    this.categorie.categoriaActualizada$.subscribe(actualizado => {
      if (actualizado) {
        this.getAllCategories();
      }
    });
  }

  deleteCategorie(id:string){
    this.global.showAlertWhitFunction('ATENCION', '¿Está seguro que quiere eliminar la categoria?', () => {
      this.categorie.deleteCategorie(id)
      .subscribe({
        next:(res) => {
          this.getAllCategories();
        },
        error: (err) => {
          this.global.showAlert('Error', `Algo sucedio al intentar eliminar la categoria${err.message}`)
        }
      })
    })
  }
}
