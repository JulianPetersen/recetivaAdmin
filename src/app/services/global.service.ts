import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { AlertComponent } from '../components/ui/alert/alert.component';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(public dialog: MatDialog) {

   }

  URL: string = "http://localhost:5000/api"


  showAlert(title: string, content: string) {
    const dialogRef = this.dialog.open(AlertComponent, {
      data: { title, content },
      width: '250px',
    });
  }

  showAlertWhitFunction(title: string, content: string, afterCloseCallback?: () => void) {
    const dialogRef = this.dialog.open(AlertComponent, {
      data: { title, content },
      width: '250px',
    });
  
    dialogRef.afterClosed().subscribe((res) => {
      if (res == true) {
        afterCloseCallback();
      }
    });
  }

  isUserAdmin() {
    const roles = JSON.parse(localStorage.getItem('roles') || '[]');
    // Verificar si el usuario tiene rol de "admin" o "moderator"
    if (roles.includes('admin')) {
      return true;
    }
    return false;
  }
}
