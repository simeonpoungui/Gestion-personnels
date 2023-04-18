import { Component,ViewChild} from '@angular/core';
import { LiasseService } from 'src/app/services/liasse.service';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Arrondisssement } from 'src/models/arrondissement.models';
import { ArrondisssementService } from 'src/app/services/arrondissement.service';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { LiasseComponent } from 'src/app/forms/liasse/liasse.component';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Liasse } from 'src/models/Liasse.models';
import { AlertComponent } from 'src/app/alert/alert.component';

@Component({
  selector: 'app-liasse-view',
  templateUrl: './liasse-view.component.html',
  styleUrls: ['./liasse-view.component.scss']
})
export class LiasseViewComponent {

  dataSource!: any;
  displayedColumns = [
    'CodeLiasse',
    'LibelleLiasse',
    'Actions',
  ];
  isLoading!: boolean

  constructor(
    private liasse: LiasseService,
    private router:Router,
    private dialog: MatDialog,
    public _location:Location
  ) { }

  ngOnInit(): void {
    this.initLiasse();

  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  initLiasse() {
    this.isLoading = true
    this.liasse.getList().pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data)
      this.isLoading = false
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

  onSelectionChange(event : any){
    console.log(event.target.value)
    const parametre = event.target.value;
    this.liasse.getList().pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data)

      this.dataSource = new MatTableDataSource(data);
             this.dataSource.sort = this.sort;
         this.dataSource.paginator = this.paginator;
    },
    (error) =>{
      console.log(error)
    }
    )
  }


  edit(liasse: Liasse) {
    const ref = this.dialog.open(LiasseComponent, {
      maxWidth: '650px',
    });
     ref.componentInstance.action = 'edit';
     ref.componentInstance.IDLIASSE = liasse.IDLIASSE;
  }


  view(liasse: Liasse) {
    const refview = this.dialog.open(LiasseComponent, {
      maxWidth: '650px',
    });
     refview.componentInstance.action = 'view';
     refview.componentInstance.IDLIASSE = liasse.IDLIASSE;
  }

  create() {
    const refview = this.dialog.open(LiasseComponent, {
      maxWidth: '650px',
    });
     refview.componentInstance.action = 'create';
  }



  delete(liasse: Liasse) {
   const ref = this.dialog.open(AlertComponent);
   ref.componentInstance.type = 'danger';
   ref.componentInstance.contenu =
     'Voulez vous supprimer la liasse ' + liasse.LibelleLiasse + '?';
   ref.afterClosed().subscribe((result) => {
     if (result) {
       this.liasse.delete(liasse.IDLIASSE).pipe(catchError((error:HttpErrorResponse)=>{
         console.log(error.status);
         return []
       })).subscribe((data) => {
         console.log(data);
         this.router
           .navigateByUrl('/nationalite/list', { skipLocationChange: true })
           .then(() => {
            location.reload()
           });
       });
     }
   });
   console.log(liasse);
 }
}
