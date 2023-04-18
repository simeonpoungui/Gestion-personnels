import { Component, OnInit } from '@angular/core';
import { DepartementService } from 'src/app/services/departement.service';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Departement } from 'src/models/departement.models';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.scss']
})
export class DepartementComponent implements OnInit{

  IDDEPARTEMENT!: string;
  CodeDepartement!: string;
  NomDepartement!: string;
  Ordre!: string;
  isLoading!:boolean;

  action!: "edit" | "view";

  constructor(

    private departementService: DepartementService,
    private route: ActivatedRoute,
    private router: Router,
    public _location: Location,
  ){ }

  ngOnInit(): void {

    const departementID = this.route.snapshot.params['departementID'];
    this.action = this.route.snapshot.params['action'];

    console.log(departementID);

    if (departementID){
      this.initForUpdate(departementID);
    }

  }


  isFormValid(): boolean {
    if(this.CodeDepartement && this.NomDepartement && this.Ordre){
      return false
    }else{
      return true
    }
  }

  initForUpdate(departementID: string){

    this.departementService.get(departementID).pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data) => {
      console.log(data)

      this.IDDEPARTEMENT = data.IDDEPARTEMENT;
      this.CodeDepartement = data.CodeDepartement;
      this.NomDepartement = data.NomDepartement;
      this.Ordre = data.Ordre

    }, (error) => {
      this.router.navigateByUrl('PageNoFoundComponent')
    })
  }


  onSubmitForm(form: NgForm){

    this.isLoading = true

    console.log(form.value)
    const departement: Departement = form.value;




    departement.IDDEPARTEMENT=this.IDDEPARTEMENT;

      if (this.action === "edit"){
        this.isLoading = true
        this.departementService.update(departement).pipe(catchError((error:HttpErrorResponse)=>{
          console.log(error.status);
          return []
        })).subscribe((data) => {
          console.log(data);
          this.isLoading = false
          this.router.navigateByUrl("/departement/list")
        }, error => console.log(error));
      }else {
        this.departementService.create(departement).pipe(catchError((error:HttpErrorResponse)=>{
          console.log(error.status);
          return []
        })).subscribe((data) => {
          console.log(data)
          this.isLoading = false
          this.router.navigateByUrl("/departement/list")
        }, error => console.log(error))
      }


  }

}
