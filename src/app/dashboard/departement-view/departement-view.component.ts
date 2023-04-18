import { Component, OnInit, ViewChild } from '@angular/core';
import { DepartementService } from 'src/app/services/departement.service';
import { Departement } from 'src/models/departement.models';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AlertComponent } from 'src/app/alert/alert.component';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-departement-view',
  templateUrl: './departement-view.component.html',
  styleUrls: ['./departement-view.component.scss'],
})
export class DepartementViewComponent implements OnInit {
  dataSource!: any;
  displayedColumns = ['CodeDepartement', 'NomDepartement', 'Ordre', 'Actions'];
  isLoading!: boolean;

  constructor(
    private departementService: DepartementService,
    private router: Router,
   private dialog : MatDialog,
   public _location: Location
  ) {}

  ngOnInit(): void {
    this.initDepartement();
  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  initDepartement() {
    this.isLoading = true;
    this.departementService.getList().pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe(
      (data) => {
        console.log(data);
        this.isLoading = false;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  edit(IDDEPARTEMENT: string) {
    this.router.navigateByUrl('/departement/edit/' + IDDEPARTEMENT);
  }

  view(IDDEPARTEMENT: string) {
    this.router.navigateByUrl('/departement/view/' + IDDEPARTEMENT);
  }

  delete(departement: Departement) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.contenu =
      'Voulez vous supprimer le departement de ' + departement.NomDepartement + '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.departementService.delete(departement.IDDEPARTEMENT).subscribe((data) => {
          console.log(data);
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/departement/list']);
            });
        });
      }
    });
    console.log(departement);
  }
}
