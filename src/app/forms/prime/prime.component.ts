import { Component, OnInit, Input } from '@angular/core';
import { PRIMEService } from 'src/app/services/prime.service';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Prime } from 'src/models/prime.models';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-prime',
  templateUrl: './prime.component.html',
  styleUrls: ['./prime.component.scss']
})
export class PrimeComponent implements OnInit{

  IDPRIME!: string;
  NumOrdre!: string;
  LibellePrime!:string;
  bImposable!:boolean;
  FormuleCalcul!: string;
  Montant!: string;

  isLoading!:boolean;

  @Input() action !: "create" | "edit" | "view"

  constructor(
    private primeService: PRIMEService,
    private route: ActivatedRoute,
    private router: Router,
    public _location:Location

  ){}

  ngOnInit(): void {
    const primeID = this.route.snapshot.params['primeID'];

    console.log(primeID)
    if (primeID){
      this.initForUpdate(primeID);
    }
  }

  isFormValid(): boolean {
    if(this.NumOrdre && this.LibellePrime && this.FormuleCalcul){
      return false
    }else{
      return true
    }
  }

  initForUpdate(compagnieID: string){
    this.isLoading = true;
    this.primeService.get(compagnieID).pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data) => {
      console.log(data)
     this.IDPRIME = data.IDPRIME;
     this.LibellePrime = data.LibellePrime;
     this.NumOrdre = data.NumOrdre;
     this.FormuleCalcul= data.FormuleCalcul;
     this.Montant = data.Montant;
      this.isLoading = false;
    }, (error) => {
      this.router.navigateByUrl('404')
    })
}


onSubmitForm(form: NgForm){
  console.log(form.value)
  const prime: Prime = form.value;

   prime.IDPRIME= this.IDPRIME;


    if (this.action === "edit"){
      this.primeService.update(prime).pipe(catchError((error:HttpErrorResponse)=>{
        console.log(error.status);
        return []
      })).subscribe((data) => {
        console.log(data);
     //   this.router.navigateByUrl("/compagnie-view")
        location.reload();
      }, error => console.log(error));
    }else {
      this.primeService.create(prime).pipe(catchError((error:HttpErrorResponse)=>{
        console.log(error.status);
        return []
      })).subscribe((data) => {
        console.log(data)
        //this.router.navigateByUrl("/compagnie-view")
        location.reload()
      }, error => console.log(error))
    }

  }

}
