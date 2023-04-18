import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { SocieteService } from 'src/app/services/societe.service';
import { Societe } from '../../../models/societe.models';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-societe',
  templateUrl: './societe.component.html',
  styleUrls: ['./societe.component.scss']
})
export class SocieteComponent {


  IDSociete!: string;
  Nom!: string;
  Adresse!:string;
  TelFixe!:string;
  Mobile!: string;
  IDville!:string;
  Responsable!:string;
  Logo!:string;
  EnteteComptable!:string;
  EntereDirection!:string;
  RCCM!:string;
  NIU!:string;
  SCIET!:string;
  SCIEN!:string;
  IdentifiantSociete!:string
  Mail!:string;
  SiteWeb!:string;
  Licence!:string;
  Agrement!:string;
  CodeSociete!:string;
  isLoading!:boolean;
  isLoading2!: boolean
  imageSrc: string = "../assets/images/logo-social.png";
  message: string = "";

selectedFile!: File;

action!: "edit" | "view";
 

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private sociteService: SocieteService,
    public _location : Location
  ) {}


  ngOnInit(): void {
 
    const societeID = this.route.snapshot.params['societeID'];
    this.action = this.route.snapshot.params['action'];

    if (societeID){
     
      this.initForUpdate(societeID);
    }
  }


  initForUpdate(SocieteID: string) {
    this.isLoading = true;
    this.sociteService.get(SocieteID).subscribe((data) => {
      console.log(data);
      this.IDSociete = data.IDSociete;
      this.Nom = data.Nom;
      this.Adresse = data.Adresse;
      this.TelFixe = data.TelFixe;
      this.Mobile = data.Mobile;
      this.IDville = data.IDville;
      this.Responsable = data.Responsable;
      this.Logo = data.Logo;
      this.EnteteComptable = data.EnteteComptable;
      this.EntereDirection = data.EntereDirection;
      this.RCCM = data.RCCM;
      this.NIU = data.NIU;
      this.SCIET = data.SCIET;
      this.SCIEN = data.SCIEN;
      this.IdentifiantSociete = data.IdentifiantSociete;
      this.Mail = data.Mail;
      this.SiteWeb = data.SiteWeb;
      this.Licence = data.Licence;
      this.Agrement = data.Agrement;
      this.CodeSociete = data.CodeSociete;
      this.imageSrc = data.Logo

      this.isLoading =false

    });
  }


  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageSrc = reader.result as string;
    };
  }


  


  onSubmitSociete(form: NgForm) {

    
    const Societe: Societe = form.value;

    console.log(this.imageSrc);

    Societe.IDSociete = this.IDSociete
    if(this.imageSrc == "../assets/images/imageVide.png" ){
      this.imageSrc = ""

    }else{

      Societe.Logo = this.imageSrc

    }

    if (this.action === 'edit') {
      this.isLoading2 = true
      this.message= "Modification de la societé en cours"
      this.sociteService.update(Societe).subscribe(
        (data) => {
          console.log(data);
          
          this.isLoading2 = false
          this.router.navigateByUrl('/societe/list');
        },
        (Error) => console.log(Error)
      );
    } else {
      this.isLoading2 = true
      this.message= "Création de la societé en cours"
      this.sociteService.create(Societe).subscribe(
        (data) => {
          console.log(data);
          this.isLoading2 = false
          this.router.navigateByUrl('/societe/list');
        },
        (error) => console.log(error)
      );
    }
  }

}
