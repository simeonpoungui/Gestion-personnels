import { Component, OnInit } from '@angular/core';
import { ZoneService } from 'src/app/services/zone.service';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Zone } from 'src/models/zone.models';
import { Departement } from 'src/models/departement.models';
import { DepartementService } from 'src/app/services/departement.service';
import { Arrondisssement } from 'src/models/arrondissement.models';
import { ArrondisssementService } from 'src/app/services/arrondissement.service';
import { LoadingComponent } from 'src/app/loading/loading.component';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss']
})
export class ZoneComponent {

  IDZone!: string;
  CodeZone!: string;
  NomZone!: string;
  IDDEPARTEMENT!: string;
  IDARRONDISSEMENT!: string;
  departementList!: Departement[];
  arrondissementList!: Arrondisssement[];

  isLoading!:boolean;

  action!: "edit" | "view";


  constructor(

    private zoneService: ZoneService,
    private route: ActivatedRoute,
    private router: Router,
    public _location: Location,
    private departementService : DepartementService,
    private arrondissementService : ArrondisssementService

  ){ }

  ngOnInit(): void {


    const zoneID = this.route.snapshot.params['zoneID'];
    this.action = this.route.snapshot.params['action'];
    const departementID = this.route.snapshot.params['departementID'];
    console.log(zoneID);

    if (zoneID){
      this.initForUpdate(zoneID);
    }
    this.loadDepartement();

    if(zoneID){
      this.initForUpdate(zoneID);
      this.zoneService.RecuperationAll(departementID).pipe(catchError((error:HttpErrorResponse)=>{
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


  }

  isFormValid(): boolean {
    if(this.CodeZone && this.NomZone && this.IDDEPARTEMENT){
      return false
    }else{
      return true
    }
  }


onSelectionChange(event : any){
  console.log(event.target.value)
  this.zoneService.RecuperationAll(this.IDDEPARTEMENT).pipe(catchError((error:HttpErrorResponse)=>{
    console.log(error.status);
    return []
  })).subscribe((data)=>{
    console.log(data)
    this.arrondissementList= data
  },
  (error) =>{
    console.log(error)
  }
  )
}



  initForUpdate(zoneID: string){
    this.zoneService.get(zoneID).pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data) => {
    console.log(data)
    this.IDZone = data.IDZone;
    this.CodeZone = data.CodeZone;
    this.NomZone = data.NomZone;
    this.IDDEPARTEMENT = data.IDDEPARTEMENT;
    this.IDARRONDISSEMENT = data.IDARRONDISSEMENT

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
    const zone: Zone = form.value;
    zone.IDZone=this.IDZone;

      if (this.action === "edit"){
        this.zoneService.update(zone).pipe(catchError((error:HttpErrorResponse)=>{
          console.log(error.status);
          return []
        })).subscribe((data) => {
          console.log(data);
          this.router.navigateByUrl("/zone/list")
        }, error => console.log(error));
      }else {
        this.zoneService.create(zone).pipe(catchError((error:HttpErrorResponse)=>{
          console.log(error.status);
          return []
        })).subscribe((data) => {
          console.log(data)
          this.isLoading = false
          this.router.navigateByUrl("/zone/list")
        }, error => console.log(error))
      }


  }


}
