import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';
import { AdminUserResponse } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class InfoUsersService {

  constructor(private http:HttpClient, private global:GlobalService) {
  
  }

  private getToken(): string | null {
    if (typeof window !== 'undefined') {  // Aseguramos que esto solo suceda en el cliente
      return localStorage.getItem('token');
    }
    return null;  // En el servidor, simplemente no hay token
  }


  getInfoUsers(){
    const token = this.getToken();  // Obtenemos el token de forma segura
    let headers = new HttpHeaders({
      'x-access-token': token || ''  // Si el token no existe, mandamos un string vacío
    })
    return this.http.get<AdminUserResponse[]>(`${this.global.URL}/infousers/adminUsers`,{headers:headers})
  }

  desactivateUser(id:string,body){
    const token = this.getToken();  // Obtenemos el token de forma segura
    let headers = new HttpHeaders({
      'x-access-token': token || ''  // Si el token no existe, mandamos un string vacío
    })
    return this.http.put(`${this.global.URL}/infousers/adminUsers/${id}`,body,{headers:headers})
  }
}
