import { Component,ViewChild} from '@angular/core';
import { NationaliteService } from 'src/app/services/nationalite.service';
import { Nationalite } from 'src/models/nationalite.models';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Arrondisssement } from 'src/models/arrondissement.models';
import { ArrondisssementService } from 'src/app/services/arrondissement.service';
import { MatDialog } from '@angular/material/dialog';
import { NationaliteComponent } from 'src/app/forms/nationalite/nationalite.component';
import { AlertComponent } from 'src/app/alert/alert.component';
import { Location } from '@angular/common';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-nationalite-view',
  templateUrl: './nationalite-view.component.html',
  styleUrls: ['./nationalite-view.component.scss']
})
export class NationaliteViewComponent {

  dataSource!: any;
  displayedColumns = [
    'Nationalite',
    'Actions',
  ];
  isLoading!: boolean

  constructor(
    private nationaliteService: NationaliteService,
    private router:Router,
    private dialog: MatDialog,
    public _location:Location
  ) { }

  ngOnInit(): void {
    this.initNationalite();

  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  initNationalite() {
    this.isLoading = true
    this.nationaliteService.getList().pipe(catchError((error:HttpErrorResponse)=>{
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
    this.nationaliteService.getList().pipe(catchError((error:HttpErrorResponse)=>{
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


  edit(nationalite: Nationalite) {
    const ref = this.dialog.open(NationaliteComponent, {
      maxWidth: '650px',
    });
    ref.componentInstance.action = 'edit';
    ref.componentInstance.IDNATIONALITE = nationalite.IDNATIONALITE;
  }

  view(nationalite: Nationalite) {
    const refview = this.dialog.open(NationaliteComponent, {
      maxWidth: '650px',
    });
    refview.componentInstance.action = 'view';
    refview.componentInstance.IDNATIONALITE = nationalite.IDNATIONALITE;
  }


  create() {
    const refview = this.dialog.open(NationaliteComponent, {
      maxWidth: '650px',
    });
    refview.componentInstance.action = 'create';
  }


 delete(nationalite: Nationalite) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.contenu =
      'Voulez vous supprimer la nationalité ' + nationalite.Nationalite + '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.nationaliteService.delete(nationalite.IDNATIONALITE).pipe(catchError((error:HttpErrorResponse)=>{
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
    console.log(nationalite);
  }


}
