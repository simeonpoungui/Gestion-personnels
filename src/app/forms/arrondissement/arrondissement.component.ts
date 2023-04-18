import { Component, OnInit } from '@angular/core';
import { ArrondisssementService } from 'src/app/services/arrondissement.service';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Arrondisssement } from 'src/models/arrondissement.models';
import { Departement } from 'src/models/departement.models';
import { DepartementService } from 'src/app/services/departement.service';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-arrondissement',
  templateUrl: './arrondissement.component.html',
  styleUrls: ['./arrondissement.component.scss']
})
export class ArrondissementComponent implements OnInit{

  IDARRONDISSEMENT!: string;
    NomArron!: string;
    Ordre!: string;
    IDDEPARTEMENT!: string;
    departementList!: Departement[];
    isLoading!:boolean

    action!: "edit" | "view";

    constructor(

      private arrondissementService: ArrondisssementService,
      private route: ActivatedRoute,
      private router: Router,
      public _location: Location,
      private departementService : DepartementService,


    ){ }

    ngOnInit(): void {

      const arrondissementID = this.route.snapshot.params['arrondissementID'];
      this.action = this.route.snapshot.params['action'];

      console.log(arrondissementID);

      if (arrondissementID){
        this.initForUpdate(arrondissementID);
      }
     this.loadDepartement()
    }

    isFormValid(): boolean {
      if(this.NomArron && this.Ordre && this.IDDEPARTEMENT){
        return false
      }else{
        return true
      }
    }


  initForUpdate(arrondissementID: string){

    this.arrondissementService.get(arrondissementID).pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data) => {
      console.log(data)

    this.IDARRONDISSEMENT = data.IDARRONDISSEMENT;
    this.IDDEPARTEMENT = data.IDDEPARTEMENT;
    this.NomArron = data.NomArron;
    this.Ordre = data.Ordre;

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

  onSubmitForm(form: NgForm){
    this.isLoading = true
    console.log(form.value)
    const arrondissement: Arrondisssement = form.value;
    arrondissement.IDARRONDISSEMENT=this.IDARRONDISSEMENT;

      if (this.action === "edit"){
        this.isLoading = true
        this.arrondissementService.update(arrondissement).pipe(catchError((error:HttpErrorResponse)=>{
          console.log(error.status);
          return []
        })).subscribe((data) => {
          console.log(data);
          this.isLoading = false
          this.router.navigateByUrl("/arrondissement/list")
        }, error => console.log(error));
      }else {
        this.arrondissementService.create(arrondissement).pipe(catchError((error:HttpErrorResponse)=>{
          console.log(error.status);
          return []
        })).subscribe((data) => {
          this.isLoading = true
          console.log(data)
          this.isLoading = false
          this.router.navigateByUrl("/arrondissement/list")
        }, error => console.log(error))
      }


  }

}
