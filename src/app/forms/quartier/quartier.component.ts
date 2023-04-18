import { Component, OnInit } from '@angular/core';
import { QuartierService } from 'src/app/services/quartier.service';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Quartier } from 'src/models/quartier.models';
import { Departement } from 'src/models/departement.models';
import { DepartementService } from 'src/app/services/departement.service';
import { Arrondisssement } from 'src/models/arrondissement.models';
import { ArrondisssementService } from 'src/app/services/arrondissement.service';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-quartier',
  templateUrl: './quartier.component.html',
  styleUrls: ['./quartier.component.scss']
})
export class QuartierComponent implements OnInit{

  IDQUARTIER!: string;
  NomQuartier!: string;
  IDDEPARTEMENT!: string;
  IDARRONDISSEMENT!: string;
  NomArron!: string;
  departementList!: Departement[];
  isLoading!: boolean;


  action!: "edit" | "view";
  arrondissementList!: Arrondisssement[];

  constructor(
    private quatierService : QuartierService,
    private route: ActivatedRoute,
    private router: Router,
    public _location: Location,
    private departementService: DepartementService,
    private arrondissementService: ArrondisssementService
  ){}

  ngOnInit(): void {

    const quartierID = this.route.snapshot.params['quartierID'];
    const departementID = this.route.snapshot.params['departementID'];
    this.action = this.route.snapshot.params['action']
    console.log(quartierID)



    if(quartierID){
      this.initForUpdate(quartierID);
      this.quatierService.Recuperation(departementID).pipe(catchError((error:HttpErrorResponse)=>{
        console.log(error.status);
        return []
      })).subscribe((data)=>{
        console.log(data)
        console.log("donnée")
        this.arrondissementList = data;
            },
            (error) =>{
              console.log(error)
            }
         )
    }


    this.loadDepartement();
   // this.loadArrondissement();

  }

  isFormValid(): boolean {
    if(this.IDARRONDISSEMENT && this.IDDEPARTEMENT && this.NomQuartier){
      return false
    }else{
      return true
    }
  }



initForUpdate(quartierID: string){

  this.quatierService.get(quartierID).pipe(catchError((error:HttpErrorResponse)=>{
    console.log(error.status);
    return []
  })).subscribe((data) => {
    console.log(data)

    this.IDQUARTIER = data.IDQUARTIER;
    this.IDARRONDISSEMENT = data.IDARRONDISSEMENT;
    this.IDDEPARTEMENT = data.IDDEPARTEMENT;
    this.NomArron = data.NomArron;
    this.NomQuartier = data.NomQuartier

  }, (error) => {
    this.router.navigateByUrl('PageNoFoundComponent')
  })
}

loadDepartement(){
  this.departementService.getList().pipe(catchError((error:HttpErrorResponse)=>{
    console.log(error.status);
    return []
  })).subscribe((data)=>{
    console.log(data)
    this.departementList = data;
  },
  (error) =>{
    console.log(error)
  }
  )
}




onSelectionChange(event : any){
  console.log(event.target.value)
  this.quatierService.Recuperation(this.IDDEPARTEMENT).pipe(catchError((error:HttpErrorResponse)=>{
    console.log(error.status);
    return []
  })).subscribe((data)=>{
    console.log(data)
    this.arrondissementList = data;
  },
  (error) =>{
    console.log(error)
  }
  )
}




onSubmitForm(form: NgForm){
  this.isLoading = true
  console.log(form.value)
  const quartier: Quartier = form.value;
  quartier.IDQUARTIER=this.IDQUARTIER;

    if (this.action === "edit"){
      this.isLoading = true
      this.quatierService.update(quartier).pipe(catchError((error:HttpErrorResponse)=>{
        console.log(error.status);
        return []
      })).subscribe((data) => {
        console.log(data);
        this.isLoading = false
        this.router.navigateByUrl("/quartier/list")
      }, error => console.log(error));
    }else {
      this.quatierService.create(quartier).pipe(catchError((error:HttpErrorResponse)=>{
        console.log(error.status);
        return []
      })).subscribe((data) => {
        console.log(data)
        this.isLoading = false
        this.router.navigateByUrl("/quartier/list")
      }, error => console.log(error))
    }


}


}
