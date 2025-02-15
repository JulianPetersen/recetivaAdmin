import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Recetas } from '../models/recetas';

@Injectable({
  providedIn: 'root'
})
export class RecetasService {

  constructor(private global:GlobalService, private http:HttpClient) { }

  token:any = localStorage.getItem('token')

  createReceta(receta:Recetas){
    let headers = new HttpHeaders({
      'x-access-token': this.token
    })
    const fd = new FormData();
    fd.append('title', receta.title)
    fd.append('ingredientes', receta.ingredientes)
    fd.append('img', receta.img)
    fd.append('instrucciones', receta.instrucciones);
    return this.http.post<Recetas>(`${this.global.URL}/recetas`,fd,{headers:headers})
  }


  getAllRecetas(){
    let headers = new HttpHeaders({
      'x-access-token': this.token
    })
    return this.http.get<Recetas[]>(`${this.global.URL}/recetas`,{headers:headers})
  }
}
