import { Component , OnInit ,ViewChild } from '@angular/core';
import { Prime } from 'src/models/prime.models';
import { PRIMEService } from 'src/app/services/prime.service';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/alert/alert.component';
import { PrimeComponent } from 'src/app/forms/prime/prime.component';
import { Retenue } from 'src/models/retenue.models';
import { RetenueService } from 'src/app/services/retenue.service';
import { RetenueComponent } from 'src/app/forms/retenue/retenue.component';
import { Location } from '@angular/common';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-prime-view',
  templateUrl: './prime-view.component.html',
  styleUrls: ['./prime-view.component.scss']
})
export class PrimeViewComponent implements OnInit{

  dataSource!: any;
  dataSource2!: any
  displayedColumns = [ "NumOrdre", "LibellePrime", "bImposable","Actions" ];

  displayedColumns1 = [ "NumOrdre", "LibelleRetenue", "bDeductibleBaseImposable","bEstCNSS","Actions" ];

  isLoading!:boolean;

  constructor(
    private primeService: PRIMEService,
    private retenueService: RetenueService,
    private router: Router,
    private dialog: MatDialog,
    public _location: Location
  ){}

  ngOnInit(): void {

    this.initPrime();
    this.initRetenue()

   }

   @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  initPrime(){
    this.isLoading = true;
    this.primeService.getList().pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data)
      this.isLoading= false
      this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    },
      (error)=>{
        console.log("error")
      }
    )
  }

  initRetenue(){
    this.isLoading = true;
    this.retenueService.getList().pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data)
      this.isLoading= false
        this.dataSource2 = new MatTableDataSource(data);
        this.dataSource2.sort = this.sort;
        this.dataSource2.paginator = this.paginator;
    },
      (error)=>{
        console.log("error")
      }
    )
  }


  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }



  create(){
    this.dialog.open(PrimeComponent)
  }

  create2(){
    this.dialog.open(RetenueComponent)
  }



  edit(prime: Prime) {
    // this.router.navigate(['/compagnie/edit/' + compagnie.IDCOMPAGNIE]);
    const ref = this.dialog.open(PrimeComponent)
    ref.componentInstance.IDPRIME = prime.IDPRIME;
    ref.componentInstance.LibellePrime = prime.LibellePrime;
    ref.componentInstance.NumOrdre = prime.NumOrdre;
    ref.componentInstance.bImposable = prime.bImposable;
    ref.componentInstance.FormuleCalcul= prime.FormuleCalcul
    ref.componentInstance.action = "edit";

    console.log(ref.componentInstance)
    }


  edit1(retenue: Retenue) {
    // this.router.navigate(['/compagnie/edit/' + compagnie.IDCOMPAGNIE]);
    const ref = this.dialog.open(RetenueComponent)
    ref.componentInstance.IDRETENUE = retenue.IDRETENUE;
    ref.componentInstance.LibelleRetenue = retenue.LibelleRetenue;
    ref.componentInstance.NumOrdre = retenue.NumOrdre;
    ref.componentInstance.bEstCNSS = retenue.bEstCNSS;
    ref.componentInstance.bDeductibleBaseImposable = retenue.bDeductibleBaseImposable;
    ref.componentInstance.FormuleCalcul= retenue.FormuleCalcul
    ref.componentInstance.action = "edit";

    console.log(ref.componentInstance)
    }

    view1(retenue: Retenue) {
      // this.router.navigate(['/compagnie/edit/' + compagnie.IDCOMPAGNIE]);
      const ref = this.dialog.open(RetenueComponent)
      ref.componentInstance.IDRETENUE = retenue.IDRETENUE;
      ref.componentInstance.LibelleRetenue = retenue.LibelleRetenue;
      ref.componentInstance.NumOrdre = retenue.NumOrdre;
      ref.componentInstance.bEstCNSS = retenue.bEstCNSS;
      ref.componentInstance.bDeductibleBaseImposable = retenue.bDeductibleBaseImposable;
      ref.componentInstance.FormuleCalcul= retenue.FormuleCalcul
      ref.componentInstance.action = "view";

      console.log(ref.componentInstance)
      }

    view(prime: Prime) {
    //  this.router.navigate(['/compagnie/view/' + compagnie.IDCOMPAGNIE]);
     const ref = this.dialog.open(PrimeComponent)
     ref.componentInstance.IDPRIME = prime.IDPRIME;
     ref.componentInstance.LibellePrime = prime.LibellePrime;
     ref.componentInstance.NumOrdre = prime.NumOrdre;
     ref.componentInstance.bImposable = prime.bImposable;
     ref.componentInstance.FormuleCalcul= prime.FormuleCalcul
     ref.componentInstance.action = "view";


     console.log(ref.componentInstance)
    }


  delete(prime: Prime) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.contenu =
      'Voulez vous supprimer la ' + prime.LibellePrime+ '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.primeService.delete(prime.IDPRIME).pipe(catchError((error:HttpErrorResponse)=>{
          console.log(error.status);
          return []
        })).subscribe((data) => {
          console.log(data);
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['prime_et_Retenue/list']);
            });
        });
      }
    });
    console.log(prime);
  }


  delete1(retenue: Retenue) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.contenu =
      'Voulez vous supprimer la retenue ' + retenue.LibelleRetenue+ '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.retenueService.delete(retenue.LibelleRetenue).subscribe((data) => {
          console.log(data);
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/prime/list']);
            });
        });
      }
    });
    console.log(retenue);
  }

}
