import { Component, OnInit } from '@angular/core';
import { DepartementService } from 'src/app/services/departement.service';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Departement } from 'src/models/departement.models';
import { CompteService } from '../../services/compte.service';
import { Compte } from 'src/models/compte.models';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Liasse } from 'src/models/Liasse.models';
import { LiasseService } from 'src/app/services/liasse.service';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.scss']
})
export class CompteComponent {

  IDCOMPTE!: string;
  CodeCompte!: string;
  LibelleCompte!: string;
  SoldeDebit!: string;
  SoldeCredit!:boolean;

  DateCreation!: string;
  LiasseDebit!: string;
  LiasseCredit!: string;
  SensDC!: string;
  CompteDeContrePartie!:string;
  CompteDeCumul!: string;
  CompteDeBanque!: string;
  CreePar!: string;
  Classe!: string;
  PersonneAssociee!:string;
  TypePersonneAssociee!: string;
  ProduitAssocie!: string;
  EstUnChapitre!: string;
  isLoading!:boolean;
  message!: string;

  listcompte!: Compte[]

  liasse!: Liasse[]


  action!: "edit" | "view";

  constructor(

    private CompteService: CompteService,
    private route: ActivatedRoute,
    private router: Router,
    public _location: Location,
    private liasseService: LiasseService
  ){ }

  ngOnInit(): void {

    const compteID = this.route.snapshot.params['compteID'];
    this.action = this.route.snapshot.params['action'];

    console.log(compteID);

    if (compteID){
      this.initForUpdate(compteID);

    }

    this.initCompte();
    this.initLiasse()

  }

  initCompte(){
    this.CompteService.getListCompte().pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data)
      this.listcompte = data;
      console.log(this.listcompte)
    },
    (error) =>{
      console.log(error)
    }
    )
  }

  initLiasse(){
    this.liasseService.getList().pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data)
      this.liasse = data;
      console.log(this.liasse)
    },
    (error) =>{
      console.log(error)
    }
    )
  }

  initForUpdate(compteID: string){

    this.CompteService.get(compteID).pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data) => {
      console.log(data)

      this.IDCOMPTE = data.IDCOMPTE;
      this.CodeCompte = data.CodeCompte;
      this.LibelleCompte = data.LibelleCompte;
      this.SoldeDebit = data.SoldeDebit;
      this.DateCreation = data.DateCreation;
      this.LiasseDebit = data.LiasseDebit;
      this.SoldeDebit = data.SoldeDebit;
      this.SensDC = data.SensDC;
      this.CompteDeContrePartie = data.CompteDeContrePartie;
      this.CompteDeCumul = data.CompteDeCumul;
      this.CompteDeBanque = data.CompteDeBanque;
      this.CreePar = data.CreePar;
      this.Classe = data.Classe;
      this.PersonneAssociee = data.PersonneAssociee;
      this.TypePersonneAssociee = data.TypePersonneAssociee;
      this.ProduitAssocie = data.ProduitAssocie;
      this.EstUnChapitre = data.EstUnChapitre;
      this.LiasseCredit = data.LiasseCredit
      console.log("Valeur:"+ this.CodeCompte)

    }, (error) => {
      this.router.navigateByUrl('PageNoFoundComponent')
    })
  }

  onSubmitForm(form: NgForm){

    console.log(form.value)
    const Compte: Compte = form.value;

    Compte.IDCOMPTE = this.IDCOMPTE

      if (this.action === "edit"){
        this.isLoading = true
      this.message="Modification du plan comptable en cours !!!"
        this.CompteService.update(Compte).pipe(catchError((error:HttpErrorResponse)=>{
          console.log(error.status);
          return []
        })).subscribe((data) => {
          console.log(data);
          this.isLoading = false
          this.router.navigateByUrl("/compte/list")
        }, error => console.log(error));
      }else {
        this.isLoading= true;
        this.message="Création du Plan comptable en cours !!!"
        this.CompteService.create(Compte).pipe(catchError((error:HttpErrorResponse)=>{
          console.log(error.status);
          return []
        })).subscribe((data) => {
          console.log(data)
          this.isLoading = false
          this.router.navigateByUrl("/compte/list")
        }, error => console.log(error))
      }


  }

}
