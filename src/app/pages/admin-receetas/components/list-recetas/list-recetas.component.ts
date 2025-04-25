import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { GlobalService } from '../../../../services/global.service';
import { RecetasService } from '../../../../services/recetas.service';
import { Recetas } from '../../../../models/recetas';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../../../components/ui/delete-dialog/delete-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-recetas',
  templateUrl: './list-recetas.component.html',
  styleUrl: './list-recetas.component.scss'
})
export class ListRecetasComponent {

  allRecetas:Recetas[] = [];

  displayedColumns: string[] = ['title', 'nutricionista', 'img','iconos']; // Columnas de la tabla
  dataSource = new MatTableDataSource<any>([]);
  totalRecetas = 0; // Total de recetas en la BD
  pageSize = 10; // Cantidad de recetas por página
  isLoading:boolean = true
  @Output() loaded = new EventEmitter<void>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private global:GlobalService, 
              private receta:RecetasService,
              private dialog:MatDialog,
  ){}


  ngOnInit(){
    
  }



  ngAfterViewInit() {
    this.loadRecetas(1, this.pageSize); // Cargar la primera página

    // Escuchar cambios en el paginador
    this.paginator.page.subscribe(() => {
      this.loadRecetas(this.paginator.pageIndex + 1, this.paginator.pageSize);
    });
  }

  loadRecetas(page: number, limit: number) {
    this.receta.getAllRecetas(page, limit).subscribe(response => {
      this.loaded.emit();
      this.isLoading = false
      this.dataSource.data = response.docs; // Recetas en la tabla
      this.totalRecetas = response.totalDocs; // Total de recetas en la BD
    });
  }

  deleteReceta(id:string){
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
    
       data:id,
       width: '250px',
     });
     dialogRef.afterClosed().subscribe(result => {
       console.log(`Dialog result: ${result}`);
       if(result == true){
         this.receta.deleteReceta(id)
         .subscribe({
           next: ((res)=> {
            this.loadRecetas(1, this.pageSize);
             console.log(res)
           }),
           error:((err)=>{
             console.log(err);
           })
         })
       }
     });
   }
}
