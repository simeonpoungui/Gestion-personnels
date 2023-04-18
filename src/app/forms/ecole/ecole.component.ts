import { Component, OnInit } from '@angular/core';
import { EcoleService } from 'src/app/services/ecole.service';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Departement } from 'src/models/departement.models';
import { DepartementService } from 'src/app/services/departement.service';
import { Ecoles } from 'src/models/ecole.models';
import { ActivatedRoute, Router } from '@angular/router';
import { Arrondisssement } from 'src/models/arrondissement.models';
import { ArrondisssementService } from 'src/app/services/arrondissement.service';
import { Quartier } from 'src/models/quartier.models';
import { QuartierService } from 'src/app/services/quartier.service';
import { Zone } from 'src/models/zone.models';
import { ZoneService } from 'src/app/services/zone.service';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';




@Component({
  selector: 'app-ecole',
  templateUrl: './ecole.component.html',
  styleUrls: ['./ecole.component.scss']
})
export class EcoleComponent implements OnInit{

  IDECOLES!: string;
  CodeEtab!: string;
  Fr_NomEcole!: string;
  Fr_Adresse!: string;
  CodeEcoleDEC!: string;
  TelEphone!: string;
  NomPrenomResponsable!: string;
  QualiteResponsable!: string;
  TElephoneResponsable!: string;
  Ville!: string;
  Departement!: string;
  Commune!: string;
  Arrondissement!: string;
  IdentifiantEtab!: string;
  NbEleves!: string;
  Cycle_PrEscolaire!: string;
  Cycle_Primaire!: string;
  Cycle_College!: string;
  Cycle_Lycee!: string;
  Cycle_Superieur!: string;
  Courriel!: string;
  NumInscriptionDernier!: string;
  IDINSPECTIONS!: string;
  IDCENTRE_EXAMEN!: string;
  PositionGPS!: string;
  CodeDepartement!: string;
  Nature!: string;
  IDZone!:string;
  IDQUARTIER!:string;
  isLoading!:boolean;

  IDDEPARTEMENT!: string;
  DepartementList!: Departement[];

  ArrondissementList!: Arrondisssement[];
  QuartierList!: Quartier[]
  ZoneList!: Zone[]

  action!: "edit" | "view";

  constructor(
    private ecoleService: EcoleService,
    private route: ActivatedRoute,
    private router: Router,
    public _location: Location,
    private departementService: DepartementService,
    private arrondissementService: ArrondisssementService,
    private quartier: QuartierService,
    private zoneService: ZoneService
  ){ }

  ngOnInit(): void {

    const ecoleID = this.route.snapshot.params['ecoleID'];
    this.action = this.route.snapshot.params['action'];
    console.log(ecoleID)

    if (ecoleID){
      this.initForUpdate(ecoleID);
    }

    this.loadDepartement()
    this.loadQuartier()
    this.loadZone()

  }

  isFormValid(): boolean {
    if(this.CodeEtab && this.Fr_NomEcole && this.Fr_Adresse && this.CodeEcoleDEC && this.TelEphone && this.NomPrenomResponsable
      && this.QualiteResponsable && this.TElephoneResponsable && this.Ville && this.IDDEPARTEMENT && this.Commune && this.Arrondissement
      && this.IdentifiantEtab && this.NbEleves && this.Courriel && this.NumInscriptionDernier && this.IDINSPECTIONS && this.IDCENTRE_EXAMEN
      && this.PositionGPS && this.CodeDepartement && this.Nature && this.IDZone && this.IDQUARTIER){
      return false

    }else{
      return true
    }
  }

  onSelectionChange(event : any){
    console.log(event.target.value)
    this.ecoleService.Recuperations(this.IDDEPARTEMENT).pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data)
      this.ArrondissementList = data;
    },
    (error) =>{
      console.log(error)
    }
    )
  }


  loadDepartement(){
    this.departementService.getList().pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data)
      this.DepartementList = data;
    },
    (error) =>{
      console.log(error)
    }
    )
  }


  loadQuartier(){
    this.quartier.getList().pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data)
      this.QuartierList = data;
      console.log(this.QuartierList)
    },
    (error) =>{
      console.log(error)
    }
    )
  }


  loadZone(){
    this.zoneService.getList().pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data)
      this.ZoneList = data;
      console.log(this.ZoneList)
    },
    (error) =>{
      console.log(error)
    }
    )
  }


  initForUpdate(ecoleID: string){

    this.ecoleService.get(ecoleID).pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data) => {
      console.log(data)
      this.IDECOLES = data.IDECOLES;
      this.CodeEtab = data.CodeEtab;
      this.Fr_NomEcole = data.Fr_NomEcole;
      this.Fr_Adresse = data.Fr_Adresse;
      this.CodeEcoleDEC = data.CodeEcoleDEC;
      this.TelEphone = data.TelEphone;
      this.NomPrenomResponsable = data.NomPrenomResponsable;
      this.QualiteResponsable = data.QualiteResponsable;
      this.TElephoneResponsable = data.TElephoneResponsable;
      this.Ville = data.Ville;
      this.Departement = data.Departement;
      this.Commune = data.Commune;
      this.Arrondissement = data.Arrondissement;
      this.IdentifiantEtab = data.IdentifiantEtab;
      this.NbEleves = data.NbEleves;
      this.Cycle_PrEscolaire = data.Cycle_PrEscolaire;
      this.Cycle_Primaire = data.Cycle_Primaire;
      this.Cycle_College = data.Cycle_College;
      this.Cycle_Lycee = data.Cycle_Lycee;
      this.Cycle_Superieur = data.Cycle_Superieur;
      this.Courriel = data.Courriel;
      this.NumInscriptionDernier = data.NumInscriptionDernier;
      this.IDINSPECTIONS = data.IDINSPECTIONS;
      this.IDCENTRE_EXAMEN = data.IDCENTRE_EXAMEN;
      this.PositionGPS = data.PositionGPS;
      this.CodeDepartement = data.CodeDepartement;
      this.Nature = data.Nature;
      this.IDZone = data.IDZone;
      this.IDQUARTIER = data.IDQUARTIER
      this.IDDEPARTEMENT = data.IDDEPARTEMENT

      console.log(this.IDDEPARTEMENT)
    }, (error) => {
      this.router.navigateByUrl('PageNoFoundComponent')
    })
  }


    onSubmitForm(form: NgForm){
      this.isLoading = true
      console.log(form.value)
      const ecole: Ecoles = form.value;

        ecole.IDECOLES=this.IDECOLES;

        if (this.action === "edit"){
          this.isLoading = true
          this.ecoleService.update(ecole).pipe(catchError((error:HttpErrorResponse)=>{
            console.log(error.status);
            return []
          })).subscribe((data) => {
            console.log(data);
            this.isLoading = false
            this.router.navigateByUrl("/ecole/list")
          }, error => console.log(error));
        }else {
          this.ecoleService.create(ecole).pipe(catchError((error:HttpErrorResponse)=>{
            console.log(error.status);
            return []
          })).subscribe((data) => {
            console.log(data)
            this.isLoading = false
            this.router.navigateByUrl("/ecole/list")
          }, error => console.log(error))
        }


    }

}
