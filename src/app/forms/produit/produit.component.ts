import { Component, OnInit } from '@angular/core';
import { ProduitService } from 'src/app/services/produit.service';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Produits } from 'src/models/produit.models';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CompteService } from '../../services/compte.service';
import { Compte } from 'src/models/compte.models';
import { Liasse } from 'src/models/Liasse.models';
import { LiasseService } from 'src/app/services/liasse.service';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.scss']
})
export class ProduitComponent implements OnInit{

  IDPRODUIT!: string;
  CodeProduit!: string;
  LibelleProduit!: string;
  Occasionnel!: string;
  NumOrdre!: string;
  Montant!: string;
  ObligatoireInscription!: string;
  DateEcheance!: string;
  CompteAssocie!: string;
  NouveauxClients!: string;
  AccepteReduction!: string;
  AccepteMajoration!: string;
  LiasseDebit!: string;
  LiasseCredit!: string;
  TauxTVA!: string;
  ObligatoirePourDocuments!: string;
  VersionFichier!: string

  message!: string

  listcompte!: Compte[]
  liasse!: Liasse[]

  action!: "edit" | "view";
  isLoading!: boolean;
  IdUtilisateur: any;

  constructor(
    private CompteService: CompteService,
    private produiService: ProduitService,
    private route: ActivatedRoute,
    private router: Router,
    public _location: Location,
    private liasseService: LiasseService
  ){}

  ngOnInit(): void {

    const personnelString = localStorage.getItem("personnel");
      if (personnelString !== null) {
        const personnel = JSON.parse(personnelString);
        this.IdUtilisateur = personnel.nIDPERSONNEL
        console.log("L'utilisateur en cours est : "+ this.IdUtilisateur)
        } else {
          console.log("La variable personnel n'a pas été trouvée dans le stockage local.");

        }

    const produitID = this.route.snapshot.params['produitID'];
    this.action = this.route.snapshot.params['action'];

    console.log(produitID);

    if (produitID){
      this.initForUpdate(produitID);
    }

    this.initCompte()
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

  initForUpdate(produitID: string){

    this.produiService.get(produitID).pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data) => {
      console.log(data)

      this.IDPRODUIT = data.IDPRODUIT
      this.CodeProduit = data.CodeProduit
      this.LibelleProduit = data.LibelleProduit
      this.Occasionnel = data.Occasionnel
      this.NumOrdre = data.NumOrdre
      this.Montant = data.Montant
      this.ObligatoireInscription = data.ObligatoireInscription
      this.DateEcheance = data.DateEcheance
      this.CompteAssocie = data.CompteAssocie
      this.NouveauxClients = data.NouveauxClients
      this.AccepteReduction = data.AccepteReduction
      this.AccepteMajoration = data.AccepteMajoration
      this.LiasseDebit = data.LiasseDebit
      this.LiasseCredit = data.LiasseCredit
      this.TauxTVA = data.TauxTVA
      this.ObligatoirePourDocuments = data.ObligatoirePourDocuments
      this.VersionFichier = data.VersionFichier

    }, (error) => {
      this.router.navigateByUrl('PageNoFoundComponent')
    })
  }

  onSelectionChange(event : any){

  }

  onSubmitForm(form: NgForm){

    this.isLoading = true

    console.log(form.value)
    const produit: Produits = form.value;

    let date = new Date(produit.DateEcheance)
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    let formattedDate = year + month + day;
    console.log(formattedDate); // Output: 20230412

    produit.DateEcheance = formattedDate


    produit.IDPRODUIT=this.IDPRODUIT;

      if (this.action === "edit"){
        this.isLoading = true
        this.message = "Modification du produit en cours !!!"
        this.produiService.create(produit, this.IdUtilisateur).pipe(catchError((error:HttpErrorResponse)=>{
          console.log(error.status);
          return []
        })).subscribe((data) => {
          console.log(data)
          this.isLoading = false
          this.router.navigateByUrl("/produit/list")
        }, error => console.log(error))
      }else {
        this.message="Création du produit en cours !!!"
        this.produiService.create(produit, this.IdUtilisateur).pipe(catchError((error:HttpErrorResponse)=>{
          console.log(error.status);
          return []
        })).subscribe((data) => {
          console.log(data)
          this.isLoading = false
          this.router.navigateByUrl("/produit/list")
        }, error => console.log(error))
      }


  }

}
