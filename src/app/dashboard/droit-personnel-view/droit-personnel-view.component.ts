import { Component,OnInit ,ViewChild, Input  } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/alert/alert.component';
import { TableRetenueService } from 'src/app/services/table-retenue.service';
import { Table_retenue } from 'src/models/tableRetenue.model';
import { Table_gain } from 'src/models/table_gain.model';
import { Personnel } from 'src/models/personnel.model';
import { PersonnelService } from 'src/app/services/personnel.service';
import { Retenue } from 'src/models/retenue.models';
import { RetenueService } from 'src/app/services/retenue.service';
import { Nationalite } from 'src/models/nationalite.models';
import { NationaliteService } from 'src/app/services/nationalite.service';
import { Prime } from 'src/models/prime.models';
import { Service } from 'src/models/service.model';
import { ServiceService } from 'src/app/services/service.service';
import { format, parse } from 'date-fns';
import { PRIMEService } from 'src/app/services/prime.service';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-droit-personnel-view',
  templateUrl: './droit-personnel-view.component.html',
  styleUrls: ['./droit-personnel-view.component.scss']
})
export class DroitPersonnelViewComponent {

  @Input() listeRetenue !: Array<any>
  @Input() listeGains !: Array<any>
  @Input() Admin!: string
  @Input() Droit_GestionAgents!: string
  @Input() Droit_EncaisserDroitsPaiement!: string
  @Input() DroitSupprimerEcriture!: string
  @Input() DroitAjouteProduit!: string
  @Input() Actif!: string
  @Input() IDPERSONNEL!: string
  @Input() Base!: string
  @Input() Remuneration!: string
  @Input() sNom!: string
  @Input() sPrenom!: string
  @Input() sCivilite!: string
  @Input() sDateNaissance!: string;
  @Input() sLieuNaissance!: string;
  @Input() sIDNATIONALITE!: string;
  @Input() sVille!: string;
  @Input() sMobile1!: string;
  @Input() sMobile2!: string;
  @Input() sCourriel!: string;
  @Input() sPhoto!: string;
  @Input() sNombreEnfants!: string;
  @Input() sSituationFamiliale!: string;
  @Input() sNombrePartsImpots!: string;
  @Input() sNumCNI!: string;
  @Input() sModeRemuneration!: string
  @Input() sLogin!: string;
  @Input() sPassword!: string;
  @Input() sMontantsRetenuesDefaut!: string;
  @Input() sRemunerationBase!: string;
  @Input() sModifPasswordNecessaire!: string;
  @Input() sChampsLibre1!: string;
  @Input() sChampsLibre2!: string;
  @Input() sSignature!: string;
  @Input() sDateCreation!: string;
  @Input() sDateModification!: string;
  @Input() sEtatCompte!: string;
  @Input() sListeDeGains!: Array<any>;
  @Input() sListeDeRetenue!: Array<any>
  @Input() sIdentifiantBadge!: string
  @Input() sNumSecuriteSociale!: string
  @Input() sNumCompteBancaire!: string
  @Input() sIDService!: string
  @Input() sbDroit_EncaisserPaiement!: string
  @Input() sNationalite !: string




   bAdmin!: string;
   bDroit_GestionAgents!: string;
   bDroit_EncaisserDroitsPaiement!: string;
   bDroitSupprimerEcriture!: string;
   bDroitAjouteProduit!: string;
   bActif!: string;
   nIDPERSONNEL!: string;
   Nationalite!: string
   Nom!: string;
   Prenom!: string;
   Civilite!: string;
   DateNaissance!: string;
   LieuNaissance!: string;
   IDNATIONALITE!: string;
   Ville!: string;
   Mobile1!: string;
   Mobile2!: string;
   Courriel!: string;
   Photo!: string;
   NombreEnfants!: string;
   SituationFamiliale!: string;
   NombrePartsImpots!: string;
   NumCNI!: string;
   ModeRemuneration!: string
   Login!: string;
   Password!: string;
   MontantsRetenuesDefaut!: string;
   RemunerationBase!: string;
   ModifPasswordNecessaire!: string;
   ChampsLibre1!: string;
   ChampsLibre2!: string;
   Signature!: string;
   DateCreation!: string;
   DateModification!: string;
   EtatCompte!: string;
   tab_Retenues!:Array<Table_retenue>;
   tab_Gains!:Array<Table_gain>
   imageSrc: string = "../assets/images/logo-social.png";
   IdentifiantBadge!: string
   NumSecuriteSociale!: string;
   NumCompteBancaire!: string
   IDSERVICE!: string;
   listeService!: Service[]
   edit!: boolean;
   horraire!: string;
   mensuelle!: string

   bDroit_EncaisserPaiement!: string

   isLoading!:boolean;



  //  EtatCompte!: string;

  maCondition!: boolean;


  tableGains!: Table_gain[]

  nationaliteList!: Nationalite[]



  listeDeRetenue!: Retenue

  dataSource2!: any;
  dataSource1!: any;

  displayedColumns = [
    "LibelleRetenue",
    "Montant"
  ];

  displayedColumns2 = [
    "LibellePrime",
    "Montants"
  ];
  IdUtilisateur: any;

  modeRemunerationBool!: boolean;


  constructor(
    private tableretenueService: TableRetenueService,
    private router:Router,
    private dialog: MatDialog,
    private personnelService: PersonnelService,
    private retenueService: RetenueService,
    private nationaliService: NationaliteService,
    private primeService: PRIMEService,
    private service: ServiceService,
    public _location:Location
  ) { }

  ngOnInit(): void {
    this.isLoading = false
    const state = window.history.state;

    if (state && state.listeRetenue && state.listeGains) {
        this.listeRetenue = state.listeRetenue;
        this.listeGains = state.listeGains;
        this.Admin = state.Admin;
        this.Droit_GestionAgents = state.Droit_GestionAgents;
        this.Droit_EncaisserDroitsPaiement = state.Droit_EncaisserDroitsPaiement;
        this.DroitSupprimerEcriture = state.DroitSupprimerEcriture;
        this.DroitAjouteProduit = state.DroitAjouteProduit;
        this.Actif = state.Actif;
        this.IDPERSONNEL = state.IDPERSONNEL,
        this.Base = state.Base,
        this.Remuneration = state.Remuneration,
        this.sNom = state.sNom,
        this.sPrenom = state.sPrenom,
        this.sCivilite= state.sCivilite,
        this.sDateNaissance= state.sDateNaissance,
        this.sLieuNaissance= state.sLieuNaissance,
        this.sIDNATIONALITE= state.sIDNATIONALITE,
        this.sVille= state.sVille,
        this.sMobile1= state.sMobile1,
        this.sMobile2= state.sMobile2,
        this.sCourriel= state.sCourriel,
        this.sPhoto= state.sPhoto,
        this.sNombreEnfants= state.sNombreEnfants,
        this.sSituationFamiliale= state.sSituationFamiliale,
        this.sNombrePartsImpots= state.sNombrePartsImpots,
        this.sNumCNI= state.sNumCNI,
        this.sModeRemuneration= state.sModeRemuneration,
        this.sLogin= state.sLogin,
        this.sPassword= state.sPassword,
        this.sMontantsRetenuesDefaut= state.sMontantsRetenuesDefaut,
        this.sModifPasswordNecessaire = state.sModifPasswordNecessaire,
        this.sSignature = state.sSignature,
        this.sDateCreation = state.sDateCreation,
        this.sDateModification = state.sDateModification,
        this.sEtatCompte = state.sEtatCompte,
        this.sListeDeGains = state.sListeDeGains,
        this.sListeDeRetenue = state.sListeDeRetenue
        this.sIDService = state.sIDService,
        this.sIdentifiantBadge = state.sIdentifiantBadge,
        this.sNumSecuriteSociale = state.sNumSecuriteSociale,
        this.sNumCompteBancaire = state.sNumCompteBancaire,
        this.sbDroit_EncaisserPaiement = state.sbDroit_EncaisserPaiement,
        this.sNationalite = state.sNationalite,
        this.modeRemunerationBool = Boolean(this.sModeRemuneration)

        console.log(this.modeRemunerationBool)

        const dateStr = this.sDateNaissance;
        const dateObj = parse(dateStr, 'yyyyMMdd', new Date());
        const dateFormat = format(dateObj, 'yyyy-MM-dd');

        this.sDateNaissance = dateFormat;

       console.log(this.sModeRemuneration)
      console.log(this.IDPERSONNEL)

      // Faites quelque chose avec les données récupérées...
      this.edit= true

      this.initNationalite()


      this.initTablaRetenue();

      this.iniTableGain()

      this.initData()
      this.initService();


    } else {
      console.log("Les données ne sont pas disponibles");
      this.edit = false
      this.isLoading = true
    }



    const personnelString = localStorage.getItem("personnel");
    if (personnelString !== null) {
      const personnel = JSON.parse(personnelString);
      this.IdUtilisateur = personnel.nIDPERSONNEL
      console.log("L'utilisateur en cours est : "+ this.IdUtilisateur)


        } else {
          console.log("La variable personnel n'a pas été trouvée dans le stockage local.");

        }

        if (this.edit == true){
          console.log(this.listeRetenue)
          console.log(this.listeGains)
          console.log(this.sListeDeGains)


          const MaListeDeGain = this.listeGains.map(element => element.IDPRIME);

          const AjouterGain = this.sListeDeGains.filter(element => !MaListeDeGain.some(id => id === element.IDPRIME));

          if (AjouterGain.length > 0) {
            this.listeGains.push(...AjouterGain);
          console.log(AjouterGain)
          }

          const MaListeRetenue = this.listeRetenue.map(element => element.IDRETENUE);
          const AjoutRetenue = this.sListeDeRetenue.filter(element => !MaListeRetenue.some(id => id === element.IDRETENUE));

          if (AjoutRetenue.length > 0) {
            this.listeRetenue.push(...AjoutRetenue);
            console.log(AjoutRetenue)
          }


          console.log(this.listeGains)



        }else{
          this.primeService.getList().subscribe((data)=>{
            console.log(data)
            this.listeGains = data.map(item => ({
              IDPrime: item.IDPRIME,
              NumOrdre: item.NumOrdre,
              LibellePrime: item.LibellePrime,
              Montant: item.Montant
            }));
            this.dataSource1 = new MatTableDataSource(this.listeGains);
          this.dataSource1.sort = this.sort;
          this.dataSource1.paginator = this.paginator;

            console.log(this.listeGains)
          })

          this.retenueService.getList().subscribe((data)=>{
            console.log(data)

            this.listeRetenue = data.map(item => ({
              IDRETENUE: item.IDRETENUE,
              NumOrdre: item.NumOrdre,
              LibelleRetenue: item.LibelleRetenue,
              Montant: item.Montant
            }));
            console.log(this.listeRetenue)

            this.dataSource2 = new MatTableDataSource(this.listeRetenue);
            this.dataSource2.sort = this.sort;
            this.dataSource2.paginator = this.paginator;
          })


        }



  }
    @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  initTablaRetenue() {this.isLoading=true;

      console.log(this.listeRetenue)
      this.dataSource2 = new MatTableDataSource(this.listeRetenue);
             this.dataSource2.sort = this.sort;
         this.dataSource2.paginator = this.paginator;
         this.isLoading=false;

  }



  initService(){
    this.isLoading=true;
    this.service.getList().pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
    console.log(data)
    this.listeService = data
   },
     (error)=>{
       console.log(error)
     }
   )
   this.isLoading=false;
  }


initNationalite(){
  this.isLoading=true;
  this.nationaliService.getList().pipe(catchError((error:HttpErrorResponse)=>{
    console.log(error.status);
    return []
  })).subscribe((data)=>{
    console.log(data)
    this.nationaliteList = data
  },
    (error)=>{
      console.log(error)
    }
  )
  this.isLoading= false
}


  iniTableGain(){
    this.isLoading=true;
    console.log(this.listeGains)
      this.dataSource1 = new MatTableDataSource(this.listeGains);
         this.dataSource1.sort = this.sort;
         this.dataSource1.paginator = this.paginator;
         this.isLoading=false;
  }




  initData(){
    this.isLoading=true;
    if(this.edit==true){

      this.personnelService.get(this.IDPERSONNEL).pipe(catchError((error:HttpErrorResponse)=>{
        console.log(error.status);
        return []
      })).subscribe((data)=>{
        console.log(data)

        let MaPhoto=data.Photo



        this.isLoading = true;
        this.bAdmin = this.Admin;
        this.bDroit_GestionAgents = this.Droit_GestionAgents;
        this.bDroit_EncaisserDroitsPaiement = this.Droit_EncaisserDroitsPaiement;
        this.bDroitSupprimerEcriture = this.DroitSupprimerEcriture;
        this.bDroitAjouteProduit = this.DroitAjouteProduit;
        this.bActif = this.Actif;
        this.nIDPERSONNEL = this.IDPERSONNEL
        this.RemunerationBase = this.Base
        this.ModeRemuneration = this.Remuneration
        this.Nom = this.sNom,
        this.Prenom = this.sPrenom,
        this.Civilite= this.sCivilite,

        this.DateNaissance= this.sDateNaissance,
        this.LieuNaissance= this.sLieuNaissance,
        this.IDNATIONALITE= this.sIDNATIONALITE,
        this.Ville= this.sVille,
        this.Mobile1= this.sMobile1,
        this.Mobile2= this.sMobile2,
        this.Courriel= this.sCourriel,
        this.Photo= MaPhoto,
        this.NombreEnfants= this.sNombreEnfants,
        this.SituationFamiliale= this.sSituationFamiliale,
        this.NombrePartsImpots= this.sNombrePartsImpots,
        this.NumCNI= this.sNumCNI,

        this.ModeRemuneration= this.sModeRemuneration ,
        this.Login= this.sLogin,
        this.Password= this.sPassword,
        this.MontantsRetenuesDefaut= this.sMontantsRetenuesDefaut,
        this.ModifPasswordNecessaire = this.sModifPasswordNecessaire,
        this.Signature = this.sSignature,
        this.DateCreation = this.sDateCreation,
        this.DateModification = this.sDateModification,
        this.EtatCompte = this.sEtatCompte
        this.IDSERVICE = this.sIDService

        this.IdentifiantBadge = this.sIdentifiantBadge,
        this.NumSecuriteSociale = this.sNumSecuriteSociale,
        this.NumCompteBancaire = this.sNumCompteBancaire,
        this.bDroit_EncaisserPaiement= this.sbDroit_EncaisserPaiement
        this.Nationalite = this.sNationalite

        console.log(this.Nationalite)

        console.log(this.bDroit_EncaisserPaiement)

        console.log(this.IDSERVICE)


        console.log(this.bActif)

        console.log(this.nIDPERSONNEL)

        console.log(this.ModeRemuneration)

        console.log(this.DateNaissance)


        console.log(this.Photo)
        console.log(this.IDSERVICE)



      },
        (error)=>{
          console.log(error)
        }
      )

      this.isLoading=false;
    }


    this.isLoading = false
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.Photo = reader.result as string;

      console.log(this.Photo)
    };
  }

  change(horraire: string){
    this.horraire = horraire;
  }

  onFileSelectede(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.Signature = reader.result as string;

      console.log(this.Signature)
    };
  }


  onSubmitForm(form: NgForm){

    this.isLoading = true

    console.log(form.value)


    const personnel: Personnel = form.value;
    personnel.nIDPERSONNEL = this.nIDPERSONNEL
    personnel.tab_Retenues = this.listeRetenue
    personnel.tab_Gains = this.listeGains
    // personnel.tab_Gains = this.listeGain

    console.log(personnel.nIDPERSONNEL)

 if(!this.ModeRemuneration){
   personnel.ModeRemuneration = '0'
 }

 console.log(personnel.ModeRemuneration)


    personnel.nIDPERSONNEL = this.nIDPERSONNEL

    console.log(personnel.nIDPERSONNEL)
    if(this.imageSrc == "" ){
      this.imageSrc = ""

    }else{

      personnel.Photo = this.Photo
      personnel.Signature= this.Signature

    }


    let date = new Date(personnel.DateNaissance)
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    let formattedDate = year + month + day;
    console.log(formattedDate); // Output: 20230412

    personnel.DateNaissance = formattedDate

    console.log(personnel.ModeRemuneration)


    if(this.edit== false){
      personnel.tab_Retenues = this.listeRetenue
      personnel.tab_Gains = this.listeGains
    }


    personnel.ModeRemuneration = this.sModeRemuneration==this.horraire?this.ModeRemuneration:this.horraire

            this.personnelService.create(personnel,this.IdUtilisateur ).pipe(catchError((error:HttpErrorResponse)=>{
              console.log(error.status);
              return []
            })).subscribe((data) => {
              console.log(data)
              this.isLoading = false
             this.router.navigateByUrl('/personnel/list')
            }, error => console.log(error))



 }
 }
