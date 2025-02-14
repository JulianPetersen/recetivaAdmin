import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../components/ui/alert/alert.component';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(public dialog:MatDialog) { }

    URL:string = "http://localhost:5000/api"


    showAlert(title:string, content:string){
      const dialogRef = this.dialog.open(AlertComponent, {
        data:{title,content},
        width: '250px',
      });
    }
}
