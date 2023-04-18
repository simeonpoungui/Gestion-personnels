import { Component , OnInit ,ViewChild } from '@angular/core';
import { Quartier } from 'src/models/quartier.models';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Arrondisssement } from 'src/models/arrondissement.models';
import { ArrondisssementService } from 'src/app/services/arrondissement.service';
import { Departement } from 'src/models/departement.models';
import { DepartementService } from 'src/app/services/departement.service';
import { AlertComponent } from 'src/app/alert/alert.component';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { QuartierService } from 'src/app/services/quartier.service';
import { LoadingComponent } from 'src/app/loading/loading.component';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-quartier-view',
  templateUrl: './quartier-view.component.html',
  styleUrls: ['./quartier-view.component.scss']
})
export class QuartierViewComponent implements OnInit{

  dataSource!: any;
  displayedColumns = [ "NomQuartier", "IDDEPARTEMENT","NomArron","Actions" ];
  isLoading!:boolean;
  arrondissementList!: Arrondisssement[];
  departementList!: Departement[]



  constructor(
    private quartier: QuartierService,
    private router: Router,
    private departementService : DepartementService,
    private arrondissementService: ArrondisssementService,
    private quartierService: QuartierService,
    private dialog: MatDialog,
    public _location:Location
  ){}

  ngOnInit(): void {


    this.loadDefault();
    this.loadDepartement()
  }


  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  loadDepartement(){
   this.departementService.getList().pipe(catchError((error:HttpErrorResponse)=>{
    console.log(error.status);
    return []
  })).subscribe((data)=>{
    this.departementList = data
   })
  }

  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  loadDefault(){
    this.isLoading = true
    this.quartier.RecuperationArrondissement("0").subscribe((data)=>{
      console.log(data)
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(data);
             this.dataSource.sort = this.sort;
         this.dataSource.paginator = this.paginator;
    },
    (error) =>{
      console.log(error)
    }
    )
  }

 //recuperer les quartiers par rapport aux departements et arrondissements
 
  onSelectionChanges(event : any){
    console.log(event.target.value)
    const parametre = event.target.value;
    this.isLoading = true
    parametre;
    //recuperer les quartiers par rapport aux departements
    this.quartierService.RecuperationDepartement(parametre).pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data)

      this.dataSource = new MatTableDataSource(data);
             this.dataSource.sort = this.sort;
         this.dataSource.paginator = this.paginator;
         this.isLoading = false
    },
    (error) =>{
      console.log(error)
    }
    )
    
  //Recuperer les arrondissements par rapport aux departements

    this.quartierService.Recuperation(parametre).pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data)
      this.arrondissementList =data
    },
        (error)=>{
          console.log(error)
        }
    )

  }


  //recuperer les quartiers par rapport aux arrondissements

  onSelectionChange(event : any){
    console.log(event.target.value)
    const parametre = event.target.value;
    this.isLoading = true
    this.quartierService.RecuperationArrondissement(parametre).pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data)

      this.dataSource = new MatTableDataSource(data);
             this.dataSource.sort = this.sort;
         this.dataSource.paginator = this.paginator;
         this.isLoading = false
    },
    (error) =>{
      console.log(error)
    }
    )
  }


  edit(IDQUARTIER: string, IDDEPARTEMENT: string){
    this.router.navigateByUrl('/quartier/edit/' + IDQUARTIER+'/'+IDDEPARTEMENT);
  }




  view(IDQUARTIER: string, IDDEPARTEMENT: string){
    this.router.navigateByUrl('/quartier/view/' +  IDQUARTIER+'/'+IDDEPARTEMENT);
  }


  delete(quartier:Quartier) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.contenu =
      'Voulez vous supprimer le quatier ' + quartier.NomQuartier + '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.quartier.delete(quartier.IDQUARTIER).pipe(catchError((error:HttpErrorResponse)=>{
          console.log(error.status);
          return []
        })).subscribe((data) => {
          console.log(data);
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/quartier/list']);
            });
        });
      }
    });
    console.log(Quartier);
  }
}
