import { Component, OnInit, ViewChild } from '@angular/core';
import { CompteService } from 'src/app/services/compte.service';
import { Router } from '@angular/router';
import { Compte } from 'src/models/compte.models';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AlertComponent } from 'src/app/alert/alert.component';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-compte-view',
  templateUrl: './compte-view.component.html',
  styleUrls: ['./compte-view.component.scss']
})
export class CompteViewComponent {

  dataSource!: any;
  displayedColumns = [

    'CodeCompte',
    'LibelleCompte',
    'SoldeDebit',
    'SoldeCredit',
    // 'DateCreation',
    // 'LiasseDebit',
    // 'LiasseCredit',
    // 'SensDC',
    // 'CompteDeContrePartie',
    // 'CompteDeCumul',
    // 'CompteDeBanque',
    // 'CreePar',
    // 'Classe',
    // 'PersonneAssociee',
    // 'TypePersonneAssociee',
    // 'ProduitAssocie',
    // 'EstUnChapitre',
    'Actions'];
    message!: string

  isLoading!: boolean;

  constructor(
    private compteService: CompteService,
    private router: Router,
    private dialog: MatDialog,
    public _location:Location
  ) {}

  ngOnInit(): void {
    this.initCompte();
  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  initCompte() {
    this.isLoading = true;
    this.compteService.Recuperation("0","","0","0","0").pipe(catchError((error:HttpErrorResponse)=>{
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



  Imprimer(){


}


  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }


  edit(IDCOMPTE: string) {
    this.router.navigateByUrl('/compte/edit/' + IDCOMPTE);
  }

  view(IDCOMPTE: string) {
    this.router.navigateByUrl('/compte/view/' + IDCOMPTE);
  }

  delete(compte: Compte) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.contenu =
      'Voulez vous supprimer le compte ' +  compte.IDCOMPTE + '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.compteService.delete(compte.IDCOMPTE).subscribe((data) => {
          console.log(data);
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/compte/list']);
            });
        });
      }
    });
    console.log(compte);
  }


}
