import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from './global.service';
import { categorieReceta } from '../models/categories';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private categoriaActualizada = new BehaviorSubject<boolean>(false);
  categoriaActualizada$ = this.categoriaActualizada.asObservable();

  constructor(private http:HttpClient,private global:GlobalService) { }

  private getToken(): string | null {
    if (typeof window !== 'undefined') {  // Aseguramos que esto solo suceda en el cliente
      return localStorage.getItem('token');
    }
    return null;  // En el servidor, simplemente no hay token
  }


  createCategorie(categorie:categorieReceta){
    const token = this.getToken();  // Obtenemos el token de forma segura
    let headers = new HttpHeaders({
      'x-access-token': token || ''  // Si el token no existe, mandamos un string vacío
    })
    return this.http.post<categorieReceta>(`${this.global.URL}/categoriaRecetas`,categorie,{headers:headers})
  }


  getAllCategories(){
    return this.http.get<categorieReceta[]>(`${this.global.URL}/categoriaRecetas`)
  }

  notificarCambioCategoria() {
    this.categoriaActualizada.next(true);
  }

  deleteCategorie(id:string){
    const token = this.getToken();  // Obtenemos el token de forma segura
    let headers = new HttpHeaders({
      'x-access-token': token || ''  // Si el token no existe, mandamos un string vacío
    })
    return this.http.delete(`${this.global.URL}/categoriaRecetas/${id}`,{headers:headers})
  }
}
