import { Component } from '@angular/core';
import { InfoUsersService } from '../../services/info-users.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrl: './admin-user.component.scss'
})
export class AdminUserComponent {

  loadingChildren = true;
  childrenLoadedCount = 0;
  totalChildren = 1; // Porque tenés 3 componentes hijos

  constructor(private infoUser:InfoUsersService){}


  onChildLoaded() {
    this.childrenLoadedCount++;
    if (this.childrenLoadedCount === this.totalChildren) {
      this.loadingChildren = false;
    }
  }

}
