import { Component, OnInit, ViewChild } from '@angular/core';
import { Produits } from 'src/models/produit.models';
import { ProduitService } from 'src/app/services/produit.service';
import { AlertComponent } from 'src/app/alert/alert.component';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-produit-view',
  templateUrl: './produit-view.component.html',
  styleUrls: ['./produit-view.component.scss']
})
export class ProduitViewComponent implements OnInit{

  dataSource!: any;
  displayedColumns = ['Code', 'Libelle', 'Montant', 'Actions'];
  isLoading!: boolean;

  constructor(
    private produitService: ProduitService,
    private router: Router,
    private dialog : MatDialog,
   public _location: Location
  ){}

  ngOnInit(): void {
    this.initProduit()
  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  initProduit() {
    this.isLoading = true;
    this.produitService.getList().pipe(catchError((error:HttpErrorResponse)=>{
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

  edit(IDPRODUIT: string) {
    this.router.navigateByUrl('/produit/edit/' + IDPRODUIT);
  }

  view(IDPRODUIT: string) {
    this.router.navigateByUrl('/produit/view/' + IDPRODUIT);
  }


  delete(produit: Produits) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.contenu =
      'Voulez vous supprimer le departement de ' + produit.LibelleProduit+ '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.produitService.delete(produit.IDPRODUIT).subscribe((data) => {
          console.log(data);
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/departement/list']);
            });
        });
      }
    });
    console.log(produit);
  }

}
