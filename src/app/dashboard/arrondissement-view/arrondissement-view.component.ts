import { Component , OnInit ,ViewChild } from '@angular/core';
import { Arrondisssement } from 'src/models/arrondissement.models';
import { ArrondisssementService } from 'src/app/services/arrondissement.service';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Departement } from 'src/models/departement.models';
import { DepartementService } from 'src/app/services/departement.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/alert/alert.component';
import { Location } from '@angular/common';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-arrondissement-view',
  templateUrl: './arrondissement-view.component.html',
  styleUrls: ['./arrondissement-view.component.scss']
})
export class ArrondissementViewComponent implements OnInit{

  dataSource!: any;
  displayedColumns = [ "NomArron", "Ordre", "IDDEPARTEMENT","Actions" ];
  departementList!: Departement[];
  arraondissementList!: Arrondisssement[];
  IDDEPARTEMENT!: string;
  isLoading!:boolean;

  constructor(
    private arrondissement: ArrondisssementService,
    private router:Router,
    private departementService: DepartementService,
    private dialog: MatDialog,
    public _location:Location
  ) { }

  ngOnInit(): void {
   // this.initArrondissement();
    this.loadDepartement();


     this.loadDefault();
  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  loadDefault(){
    this.isLoading = true
    this.arrondissement.Recuperation("0").pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data)
      this.isLoading = false
      this.arraondissementList = data;
      this.dataSource = new MatTableDataSource(data);
             this.dataSource.sort = this.sort;
         this.dataSource.paginator = this.paginator;
    },
    (error) =>{
      console.log(error)
    }
    )
  }



  loadDepartement(){
    this.isLoading = true
    this.departementService.getList().pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data)
      this.isLoading = false
      this.departementList= data;
    },
      (error)=>{
        console.log(error)
      }
    )
  }




  onSelectionChange(event : any){
    this.isLoading = true
    console.log(event.target.value)
    const parametre = event.target.value;

    this.arrondissement.Recuperation(parametre).pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data)
      this.isLoading = false
      this.arraondissementList = data;
      this.dataSource = new MatTableDataSource(data);
             this.dataSource.sort = this.sort;
         this.dataSource.paginator = this.paginator;
    },
    (error) =>{
      console.log(error)
    }
    )
  }

  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }



  edit(IDARRONDISSEMENT: string){
    this.router.navigateByUrl('/arrondissement/edit/' + IDARRONDISSEMENT);
  }




  view(IDARRONDISSEMENT: string){
    this.router.navigateByUrl('/arrondissement/view/' +  IDARRONDISSEMENT);
  }


  delete(arrondissement: Arrondisssement) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.contenu =
      'Voulez vous supprimer l\'arrondissement ' + arrondissement.NomArron+ '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.arrondissement.delete(arrondissement.IDARRONDISSEMENT).subscribe((data) => {
          console.log(data);
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/arrondissement/list']);
            });
        });
      }
    });
    console.log(arrondissement);
  }
}
