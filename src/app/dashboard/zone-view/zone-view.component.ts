import { Component,OnInit ,ViewChild  } from '@angular/core';
import { ZoneService } from 'src/app/services/zone.service';
import { Zone } from 'src/models/zone.models';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Arrondisssement } from 'src/models/arrondissement.models';
import { ArrondisssementService } from 'src/app/services/arrondissement.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/alert/alert.component';
import { Location } from '@angular/common';
import { Departement } from 'src/models/departement.models';
import { DepartementService } from 'src/app/services/departement.service';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-zone-view',
  templateUrl: './zone-view.component.html',
  styleUrls: ['./zone-view.component.scss']
})
export class ZoneViewComponent {

  dataSource!: any;
  displayedColumns = [ "CodeZone", "NomZone", "NomArron", "NomDepartement","Actions" ];
  isLoading!:boolean;
  arrondissementList!: Arrondisssement[]
  departementList!: Departement[]
  departement: any;

  constructor(
    private zoneService: ZoneService,
    private router:Router,
    private arrondissementService: ArrondisssementService,
    private dialog: MatDialog,
    public _location:Location,
    private departementService: DepartementService
  ) { }

  ngOnInit(): void {
    this.initZone();
    this.loadDepartement()
  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  initZone() {this.isLoading=true;
    this.zoneService.Recuperation("0").pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data)
      this.isLoading=false;
      this.dataSource = new MatTableDataSource(data);
             this.dataSource.sort = this.sort;
         this.dataSource.paginator = this.paginator;
    },
    (error) =>{
      console.log(error)
    }
    )
  }


  onSelectionChange(event : any){
    console.log(event.target.value)
    const parametre = event.target.value;
    this.isLoading = true
    this.zoneService.Recuperation(parametre).pipe(catchError((error:HttpErrorResponse)=>{
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


  onSelectionChanges(event : any){
    console.log(event.target.value)
    const parametre = event.target.value;
    this.isLoading = true

    this.departement = parametre;
    this.zoneService.RecuperationDepartement(this.departement ).pipe(catchError((error:HttpErrorResponse)=>{
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

    this.zoneService.Recuperations(parametre).pipe(catchError((error:HttpErrorResponse)=>{
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


  loadDepartement(){
    this.departementService.getList().pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data);
      this.departementList = data
      console.log(this.departementList)
    },
      (error)=>{
        console.log(error);
      }
    )
  }


  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }



  edit(IDZone: string, IDDEPARTEMENT: string){
    this.router.navigateByUrl('/zone/edit/' + IDZone+'/'+IDDEPARTEMENT);
  }

  view(IDZone: string, IDDEPARTEMENT: string){
    this.router.navigateByUrl('/zone/view/' +  IDZone+'/'+IDDEPARTEMENT);
  }


  delete(zone:Zone) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.contenu =
      'Voulez vous supprimer la zone de ' + zone.NomZone + '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.zoneService.delete(zone.IDZone).pipe(catchError((error:HttpErrorResponse)=>{
          console.log(error.status);
          return []
        })).subscribe((data) => {
          console.log(data);
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/zone/list']);
            });
        });
      }
    });
    console.log(zone);
  }
}
