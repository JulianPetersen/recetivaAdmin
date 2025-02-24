import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Recetas } from '../models/recetas';

@Injectable({
  providedIn: 'root'
})
export class RecetasService {

  constructor(private global:GlobalService, private http:HttpClient) { }
 
  private getToken(): string | null {
    if (typeof window !== 'undefined') {  // Aseguramos que esto solo suceda en el cliente
      return localStorage.getItem('token');
    }
    return null;  // En el servidor, simplemente no hay token
  }

  createReceta(receta:Recetas){
    const token = this.getToken();  // Obtenemos el token de forma segura
    let headers = new HttpHeaders({
      'x-access-token': token || ''  // Si el token no existe, mandamos un string vacío
    })
    const fd = new FormData();
    fd.append('title', receta.title)
    fd.append('ingredientes', receta.arrayIngredientes)
    fd.append('img', receta.img)
    fd.append('instrucciones', receta.instrucciones);
    return this.http.post<Recetas>(`${this.global.URL}/recetas`,fd,{headers:headers})
  }


  getAllRecetas(){
    const token = this.getToken();  // Obtenemos el token de forma segura
    let headers = new HttpHeaders({
      'x-access-token': token || ''  // Si el token no existe, mandamos un string vacío
    })
    return this.http.get<Recetas[]>(`${this.global.URL}/recetas`,{headers:headers})
  }


  getRecetasById(id:string){
    const token = this.getToken();  // Obtenemos el token de forma segura
    let headers = new HttpHeaders({
      'x-access-token': token || ''  // Si el token no existe, mandamos un string vacío
    })

    return this.http.get<Recetas>(`${this.global.URL}/recetas/${id}`,{headers:headers})
  }

  deleteReceta(id:string){
    const token = this.getToken();  // Obtenemos el token de forma segura
    let headers = new HttpHeaders({
      'x-access-token': token || ''  // Si el token no existe, mandamos un string vacío
    })
    return this.http.delete(`${this.global.URL}/recetas/${id}`,{headers:headers})
  }


  
}
