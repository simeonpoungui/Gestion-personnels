import { Component,OnInit ,ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { Personnel } from 'src/models/personnel.model';
import { PersonnelService } from 'src/app/services/personnel.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/alert/alert.component';
import { TableRetenueViewComponent } from '../table-retenue-view/table-retenue-view.component';
import { Table_retenue } from 'src/models/tableRetenue.model';
import { DroitPersonnelViewComponent } from '../droit-personnel-view/droit-personnel-view.component';
import { AlertEcoleComponent } from 'src/app/alert-ecole/alert-ecole.component';
import { Prime } from 'src/models/prime.models';
import { PRIMEService } from 'src/app/services/prime.service';
import { Retenue } from 'src/models/retenue.models';
import { RetenueService } from 'src/app/services/retenue.service';
import { Service } from 'src/models/service.model';
import { ServiceService } from 'src/app/services/service.service';
import { Location } from '@angular/common';
import { format, parse } from 'date-fns';
import { catchError, map } from 'rxjs';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-personnel-view',
  templateUrl: './personnel-view.component.html',
  styleUrls: ['./personnel-view.component.scss'],
  providers: [DatePipe]
})
export class PersonnelViewComponent {

  dataSource!: any;
  displayedColumns = [
    "nIDPERSONNEL" ,
    "Nom",
    "Prenom",
    "Civilite",
    "DateNaissance",
    "LieuNaissance",
    "Ville",
    "Mobile1",
    "Mobile2",
    "Courriel",
    "Actions"

  ];


  listeDeGain!: Prime[];
  ListeDeRetenue!: Retenue[]
  isLoading!:boolean;
  personnelSelected!:  Personnel;
  listService!: Service[]

  Civilite: string = "0";
  IDSERVICE: string = "0"
  EtatCompte: string = "0"
date: string | number | Date | undefined;
DateNaissance!: string;

  constructor(
    private personnelService: PersonnelService,
    private router:Router,
    private dialog: MatDialog,
    private primeService: PRIMEService,
    private retenueService: RetenueService,
    private service: ServiceService,
    public _location:Location,

  ) { }

  ngOnInit(): void {
    this.initPersonnel();
    this.initPrime()
    this.initRetenue()
    this.initService()

  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  initPersonnel() {this.isLoading=true;
    //  let persnnels$!: Personnel[];
    //    persnnels$ = this.personnelService.Recuperation("0","0","0","1").pipe(
    //    map(personnels => personnels.map(item => item.DateNaissance= this.convertToValideDate(item.DateNaissance)))
    //  )
    this.personnelService.Recuperation("0","0","0","1").pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data)
      this.isLoading=false;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    },
    (error) =>{
      console.log(error)
    }
    )
  }

  convertToValideDate(dateString: string){
    const year = dateString.slice(0, 4);
    const month  = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

  Imprimer(){

  }

  initPrime(){
    this.primeService.getList().pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data)
      this.listeDeGain= data
    },
      (error)=>{
        console.log(error)
      }
    )
  }

  initRetenue(){
    this.retenueService.getList().pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data)
      this.ListeDeRetenue = data
    },
        (error)=>{
          console.log(error)
        }
    )
  }

  initService(){
    this.service.getList().pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data)
      this.listService = data
      console.log(this.listService)
    },
        (error)=>{
          console.log(error)
        }
    )
  }


//Affichier les personnels par rapport aux idservices idcompteEtat et idCivilte

  loadListePersonnel(){
    this.personnelService.Recuperation("0",this.Civilite,this.IDSERVICE,this.EtatCompte).pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe
    ((data)=>{
        console.log(data)
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.isLoading = false
    },
      (error)=>{
        console.log(error)
      }
    )

  }


//Affichier les personnels par rapport aux id services

  onSelectionService(event: any){
    console.log(event.target.value)
    const parametre = event.target.value;
    this.isLoading = true
    this.IDSERVICE = parametre
    this.loadListePersonnel()
  }


  //Affichier les personnels par rapport aux id etatcompte

  onSelectionEtatCompte(event: any){
    console.log(event.target.value)
    const parametre = event.target.value;
    this.isLoading = true
    this.EtatCompte = parametre
    this.loadListePersonnel()
  }


  //Affichier les personnels par rapport aux id civilte

  onSelectionCivilite(event: any){
    console.log(event.target.value)
    const parametre = event.target.value;
    this.isLoading = true
    this.Civilite = parametre
    this.loadListePersonnel()
  }




  onClickLine(personnel: Personnel){
    console.log("clicque : "+ personnel.nIDPERSONNEL);
    this.personnelSelected = personnel;
  }


  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }




  view(){
    if (this.personnelSelected) {
      this.router.navigateByUrl('/droitPersonnel/list', { state: {
        listeGains: this.personnelSelected.tab_Gains,
        listeRetenue: this.personnelSelected.tab_Retenues,
        Admin: this.personnelSelected.bAdmin,
        Droit_GestionAgents: this.personnelSelected.bDroit_GestionAgents,
        Droit_EncaisserDroitsPaiement: this.personnelSelected.bDroit_EncaisserDroitsPaiement,
        DroitSupprimerEcriture: this.personnelSelected.bDroitSupprimerEcriture,
        DroitAjouteProduit: this.personnelSelected.bDroitAjouteProduit,
        Actif: this.personnelSelected.bActif,
        IDPERSONNEL: this.personnelSelected.nIDPERSONNEL,
        Base: this.personnelSelected.RemunerationBase,
        Remuneration: this.personnelSelected.ModeRemuneration,
        sNom: this.personnelSelected.Nom,
        sPrenom: this.personnelSelected.Prenom,
        sCivilite: this.personnelSelected.Civilite,
        sDateNaissance: this.personnelSelected.DateNaissance,
        sLieuNaissance: this.personnelSelected.LieuNaissance,
        sIDNATIONALITE: this.personnelSelected.IDNATIONALITE,
        sVille: this.personnelSelected.Ville,
        sMobile1: this.personnelSelected.Mobile1,
        sMobile2: this.personnelSelected.Mobile2,
        sCourriel: this.personnelSelected.Courriel,
        sPhoto: this.personnelSelected.Photo,
        sNombreEnfants: this.personnelSelected.NombreEnfants,
        sSituationFamiliale: this.personnelSelected.SituationFamiliale,
        sNombrePartsImpots: this.personnelSelected.NombrePartsImpots,
        sNumCNI: this.personnelSelected.NumCNI,
        sModeRemuneration: this.personnelSelected.ModeRemuneration,
        sLogin: this.personnelSelected.Login,
        sPassword: this.personnelSelected.Password,
        sMontantsRetenuesDefaut: this.personnelSelected.MontantsRetenuesDefaut,

        sModifPasswordNecessaire : this.personnelSelected.ModifPasswordNecessaire,
        sSignature : this.personnelSelected.Signature,
        sDateCreation : this.personnelSelected.DateCreation,
        sDateModification : this.personnelSelected.DateModification,
        sEtatCompte : this.personnelSelected.EtatCompte,
        sListeDeGains: this.listeDeGain,
        sListeDeRetenue: this.ListeDeRetenue,
        sIDService: this.personnelSelected.IDSERVICE,
        sIdentifiantBadge : this.personnelSelected.IdentifiantBadge,
        sNumSecuriteSociale : this.personnelSelected.NumSecuriteSociale,
        sNumCompteBancaire : this.personnelSelected.NumCompteBancaire,
        sbDroit_EncaisserPaiement: this.personnelSelected.bDroit_EncaisserPaiement,
        sNationalite: this.personnelSelected.Nationalite

      }});
    } else {

      const ref = this.dialog.open(AlertEcoleComponent);
      ref.componentInstance.type = 'danger';
      ref.componentInstance.contenu = "Vous devez sélectionner un agent";
      // console.log()
    }

  }


  delete(personnel:Personnel) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.contenu =
      'Voulez vous supprimer le personnel ' + personnel.Nom + '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.personnelService.delete(personnel.nIDPERSONNEL).pipe(catchError((error:HttpErrorResponse)=>{
          console.log(error.status);
          return []
        })).subscribe((data) => {
          console.log(data);
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/personnel/list']);
            });
        });
      }
    });
    console.log(Personnel);

  }


}
