import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { recetaResponse, Recetas} from '../models/recetas';
import { Observable } from 'rxjs';

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
    return this.http.post<recetaResponse>(`${this.global.URL}/recetas`,fd,{headers:headers})
  }


  getAllRecetas(page: number, limit: number): Observable<any> {
    const token = this.getToken();  // Obtenemos el token de forma segura
    let headers = new HttpHeaders({
      'x-access-token': token || ''  // Si el token no existe, mandamos un string vacío
    })
    return this.http.get<recetaResponse[]>(`${this.global.URL}/recetas?page=${page}&limit=${limit}`,{headers:headers});
  }

  getRecetasById(id:string){
    const token = this.getToken();  // Obtenemos el token de forma segura
    let headers = new HttpHeaders({
      'x-access-token': token || ''  // Si el token no existe, mandamos un string vacío
    })

    return this.http.get<recetaResponse>(`${this.global.URL}/recetas/${id}`,{headers:headers})
  }

  deleteReceta(id:string){
    const token = this.getToken();  // Obtenemos el token de forma segura
    let headers = new HttpHeaders({
      'x-access-token': token || ''  // Si el token no existe, mandamos un string vacío
    })
    return this.http.delete(`${this.global.URL}/recetas/${id}`,{headers:headers})
  }


  updateReceta(id: string, receta: Recetas, imagen?: any) {
    const token = this.getToken();
    let headers = new HttpHeaders({
      'x-access-token': token || ''
    });
  
    console.log('LA IMAGEN LLEGA',imagen)
    if (imagen) {
      const fd = new FormData();
      fd.append('title', receta.title);
      fd.append('ingredientes', JSON.stringify(receta.arrayIngredientes)); // Convertir a string
      fd.append('instrucciones', receta.instrucciones);
      fd.append('img', imagen); // Agregar imagen
  
      return this.http.put(`${this.global.URL}/recetas/${id}`, fd, { headers }); // No definir 'Content-Type'
    } else {
      headers = headers.set('Content-Type', 'application/json');
      const body = {
        title: receta.title,
        arrayIngredientes: JSON.stringify(receta.arrayIngredientes),
        instrucciones: receta.instrucciones
      };
  
      return this.http.put(`${this.global.URL}/recetas/${id}`, body, { headers });
    }
  }
  
}
