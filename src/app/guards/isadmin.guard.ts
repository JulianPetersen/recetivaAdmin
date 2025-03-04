import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GlobalService } from '../services/global.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const global = inject(GlobalService)
  // Verificar si el token existe
  if (typeof window !== 'undefined' && !!localStorage.getItem('token')) {
    // Obtener los roles desde localStorage
    const roles = JSON.parse(localStorage.getItem('roles') || '[]');

    // Verificar si el usuario tiene rol de "admin" o "moderator"
    if (roles.includes('admin')) {
      return true;
    }
  }

  // Si no tiene acceso, redirigir a login o página no autorizada
  global.showAlert('Error', 'Debes tener rol administrador para usar esta funcion')
  return false;
};