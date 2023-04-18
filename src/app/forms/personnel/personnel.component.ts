import { Component, OnInit, ViewChild, Input } from '@angular/core';
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
import { PRIMEService } from 'src/app/services/prime.service';
import { Service } from 'src/models/service.model';
import { ServiceService } from 'src/app/services/service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.scss'],
})
export class PersonnelComponent {
  bAdmin!: string;
  bDroit_GestionAgents!: boolean;
  bDroit_EncaisserDroitsPaiement!: string;
  bDroitSupprimerEcriture!: string;
  bDroitAjouteProduit!: string;
  bActif!: string;
  nIDPERSONNEL!: string;

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
  ModeRemuneration!: string;
  Login!: string;
  Password!: string;
  MontantsRetenuesDefaut!: string;
  RemunerationBase!: string;
  ModifPasswordNecessaire!: string;
  ChampsLibre1!: string;
  ChampsLibre2!: string;
  Signature!: string;
  IDSERVICE!: string;
  DateCreation!: string;
  DateModification!: string;
  EtatCompte!: string;
  tab_Retenues!: Array<any>;
  tab_Gains!: Array<any>;
  imageSrc: string = '../assets/images/logo-social.png';
  IdentifiantBadge!: string;
  NumSecuriteSociale!: string;
  NumCompteBancaire!: string;

  //  EtatCompte!: string;

  selectedFile!: File;

  action!: 'edit' | 'view';

  IdUtilisateur!: string;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.Photo = reader.result as string;
    };
  }

  listeRetenue!: any[];
  listeGain!: any[];

  maCondition!: boolean;

  tableGains!: any[];

  nationaliteList!: Nationalite[];

  isLoading!: boolean;

  listeDeRetenue!: Retenue;

  listeService!: Service[];

  dataSource!: any;
  dataSource1!: any;

  displayedColumns = ['LibelleRetenue', 'Montant'];
  displayedColumns2 = ['LibellePrime', 'Montant'];

  formattedDate: string = '';

  constructor(
    private tableretenueService: TableRetenueService,
    private router: Router,
    private dialog: MatDialog,
    private personnelService: PersonnelService,
    private retenueService: RetenueService,
    private nationaliService: NationaliteService,
    private primeService: PRIMEService,
    private service: ServiceService,
    public _location: Location
  ) {}

  ngOnInit(): void {
    const personnelString = localStorage.getItem('personnel');
    if (personnelString !== null) {
      const personnel = JSON.parse(personnelString);
      this.IdUtilisateur = personnel.nIDPERSONNEL;
      console.log("L'utilisateur en cours est : " + this.IdUtilisateur);
    } else {
      console.log(
        "La variable personnel n'a pas été trouvée dans le stockage local."
      );
    }

    this.initTablaRetenue();
    this.initNationalite();
    this.iniTablePrime();
    this.initService();
 
  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  initTablaRetenue() {
    this.isLoading = true;
    this.retenueService.getList().subscribe((data) => {
      console.log(data);

      this.listeRetenue = data.map((item) => ({
        IDRETENUE: item.IDRETENUE,
        NumOrdre: item.NumOrdre,
        LibelleRetenue: item.LibelleRetenue,
        Montant: item.Montant,
      }));
      console.log(this.listeRetenue);

      this.dataSource = new MatTableDataSource(this.listeRetenue);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  initNationalite() {
    this.nationaliService.getList().subscribe(
      (data) => {
        console.log(data);
        this.nationaliteList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  initService() {
    this.service.getList().subscribe(
      (data) => {
        console.log(data);
        this.listeService = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  iniTablePrime() {
    this.primeService.getList().subscribe((data) => {
      console.log(data);
      this.listeGain = data.map((item) => ({
        IDPrime: item.IDPRIME,
        NumOrdre: item.NumOrdre,
        LibellePrime: item.LibellePrime,
        Montant: item.Montant,
      }));
      this.dataSource1 = new MatTableDataSource(this.listeGain);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      console.log(this.listeGain);
    });
  }

  onFileSelectede(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.Signature = reader.result as string;

      console.log(this.Signature);
    };
  }

  onSubmitForm(form: NgForm) {
    this.isLoading = true;

    console.log(form.value);

    const personnel: Personnel = form.value;

    personnel.nIDPERSONNEL = this.nIDPERSONNEL;
    personnel.tab_Retenues = this.listeRetenue;
    personnel.tab_Gains = this.listeGain;

    if (!this.ModeRemuneration) {
      personnel.ModeRemuneration = '0';
    }

    console.log(personnel.ModeRemuneration);
    console.log(this.imageSrc);

    if (this.imageSrc == '../assets/images/logo-social.png') {
      this.imageSrc = '';
    } else {
      personnel.Photo = this.Photo;
      personnel.Signature = this.Signature;
    }

    let date = new Date(this.DateNaissance);
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    let formattedDate = year + month + day;
    console.log(formattedDate); // Output: 20230412

    personnel.DateNaissance = formattedDate;

    // this.personnelService.create(personnel,this.IdUtilisateur ).subscribe((data) => {
    //   console.log(data)
    //   this.isLoading = false
    //  this.router.navigateByUrl('/personnel/list')
    // }, error => console.log(error))

    //
  }




}
