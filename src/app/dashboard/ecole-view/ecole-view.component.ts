import { Component, OnInit ,ViewChild } from '@angular/core';
import { Ecoles } from 'src/models/ecole.models';
import { EcoleService } from 'src/app/services/ecole.service';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Departement } from 'src/models/departement.models';
import { DepartementService } from 'src/app/services/departement.service';
import { Zone } from 'src/models/zone.models';
import { ZoneService } from 'src/app/services/zone.service';
import { Quartier } from 'src/models/quartier.models';
import { QuartierService } from 'src/app/services/quartier.service';
import { Arrondisssement } from 'src/models/arrondissement.models';
import { ArrondisssementService } from 'src/app/services/arrondissement.service';
import { AlertComponent } from '../../alert/alert.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertEcoleComponent } from '../../alert-ecole/alert-ecole.component';
import { Location } from '@angular/common';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-ecole-view',
  templateUrl: './ecole-view.component.html',
  styleUrls: ['./ecole-view.component.scss']
})
export class EcoleViewComponent implements OnInit{

  dataSource!: any;
  displayedColumns = ["Fr_NomEcole", "Fr_Adresse","TElephone"
,"Arrondissement","NomDepartement","NbEleves","Actions" ];

  ecoleSelected!: Ecoles;

  departementList!: Departement[];
  ecoleList!: Ecoles[];
  zoneList!: Zone[];
  quartierList!: Quartier[];
  arrondissementList!: Arrondisssement[];

  isLoading!:boolean;

  prescolaire: string ="0";
  primaire: string ="0";
  college: string ="0";
  lycee: string ="0";
  superieur: string="0";
  departement: string= "0";
  arrondissement: string= "0"
  quartier: string = "0"
  zone: string = "0"
  message!: string



  constructor(
    private ecole: EcoleService,
    private router:Router,
    private departementService: DepartementService,
    private zoneService: ZoneService,
    private quartierService: QuartierService,
    private arrondissementService: ArrondisssementService,
    private dialog:MatDialog,
    public _location:Location
  ) { }

  ngOnInit(): void {
    this.loadDefault();
    this.loadDepartement();



    this.message= "chargement des écoles"
  }





  Imprimer(){

      this.isLoading = true
      this.message= "Patientez un instant, l'impression de votre fichier Pdf est en cours"
      this.ecole.impression(this.departement,this.arrondissement,this.quartier,this.zone,this.prescolaire, this.primaire, this.college, this.lycee, this.superieur).subscribe((data)=>{
        console.log(data)


        var anchor = document.createElement("a");
        anchor.href = data.message;
         anchor.download = "Liste Ecoles ";
         document.body.appendChild(anchor);
        //  anchor.click();

        let pdfWindow = window.open("", "_blank", "Liste Ecoles");


        pdfWindow ? pdfWindow!.document.write(
          "<body style='margin:0;padding:0'><iframe width='100%' height='100%' style='padding:0;margin:0' src='" +
            encodeURI(data.message) +
            "'></iframe></body>"
        ): null;

        this.isLoading = false
        this.message= "chargement de la liste"
      });

      console.log(`ID departement : ${this.departement} et ID Arrondissement: ${this.arrondissement}`)

  }



  loadDepartement(){
    this.isLoading = true
    this.departementService.getList().pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{

      console.log(data)
      this.isLoading = false
      this.departementList = data
    },
      (error)=>{
        console.log(error)
      }
    )

  }



  onSelectionChange(event : any){
    console.log(event.target.value)
    const parametre = event.target.value;
    this.isLoading = true

    this.departement = parametre;

    this.loadListeEcole()


    this.ecole.Recuperations(parametre).pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data)
      this.arrondissementList =data
    },
        (error)=>{
          console.log(error)
        }
    )

  }

  onSelectionArrondissement(event : any){
    console.log(event.target.value)
    const parametre = event.target.value;
    this.isLoading = true

    this.arrondissement= parametre

    this.loadListeEcole()

    console.log(parametre)

    this.ecole.RecuperationArrondissement(parametre).pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data)
      this.quartierList= data;
    },
    (error)=>{
      console.log(error)
    })


    this.ecole.RecuperationZone(parametre).pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data)
      this.zoneList= data;
    },
    (error)=>{
      console.log(error)
    }
)



}

onSelectionQuartier(event: any){
  console.log(event.target.value)
  const parametre = event.target.value;
  this.isLoading = true
  this.quartier = parametre
  this.loadListeEcole()
}

onSelectionZone(event: any){
  console.log(event.target.value)
  const parametre = event.target.value;
  this.isLoading = true
  this.zone = parametre
  this.loadListeEcole()
}

  loadListeEcole(){

    this.ecole.RecuperationCycle(this.departement,this.arrondissement,this.quartier,this.zone,this.prescolaire, this.primaire, this.college, this.lycee, this.superieur).pipe(catchError((error:HttpErrorResponse)=>{
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

  onSelectionPrescolaire(event: any){

   this.prescolaire = Number(event.target.checked).toString()
   console.log(this.prescolaire);
   this.isLoading = true
    this.loadListeEcole()
  }

  onSelectionPrimaire(event: any){
     this.primaire = Number(event.target.checked).toString()
   console.log(this.primaire)
   this.isLoading = true
   this.loadListeEcole()
  }

  onSelectionCollege(event: any){
     this.college = Number(event.target.checked).toString()
   console.log(this.college)
   this.isLoading = true
   this.loadListeEcole()
  }

  onSelectionLycee(event: any){
     this.lycee = Number(event.target.checked).toString()
   console.log(this.lycee)
   this.isLoading = true
   this.loadListeEcole()
  }

  onSelectionSuperieur(event: any){
     this.superieur = Number(event.target.checked).toString()
   console.log(this.superieur)
   this.isLoading = true
   this.loadListeEcole()
  }





  onSelectionEtablissement(event: any){
    console.log(event.target.value)
    const parametre = event.target.value;
    this.isLoading = true
    this.ecole.RecuperationCodeEcole(parametre).pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data)
      this.isLoading = false
      this.dataSource = new MatTableDataSource(data);
             this.dataSource.sort = this.sort;
         this.dataSource.paginator = this.paginator;
    },
    (error) =>{
      console.log(error)
    }
    )
  }

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  loadDefault(){
    this.isLoading = true
    this.ecole.Recuperation("0","0","0").pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data)
      this.isLoading = false
      this.ecoleList = data
      this.dataSource = new MatTableDataSource(data);
             this.dataSource.sort = this.sort;
         this.dataSource.paginator = this.paginator;
    },
    (error) =>{
      console.log(error)
    }
    )

  }

  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.ecole.RecuperationCodeEcole(value).pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data)=>{
      console.log(data)
      this.isLoading = false
      this.dataSource = new MatTableDataSource(data);
             this.dataSource.sort = this.sort;
         this.dataSource.paginator = this.paginator;
    },
    (error) =>{
      console.log(error)
    }
    )
  }



  edit(IDECOLES: string){
    this.router.navigateByUrl('/ecole/edit/' + IDECOLES);
  }




  view(IDECOLES: string){
    this.router.navigateByUrl('/ecole/view/' +  IDECOLES);
  }


  delete(ecole: Ecoles) {
    const ref = this.dialog.open(AlertComponent);
    ref.componentInstance.type = 'danger';
    ref.componentInstance.contenu =
      'Voulez vous supprimer l\'école ' + ecole.Fr_NomEcole+ '?';
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.ecole.delete(ecole.IDECOLES).pipe(catchError((error:HttpErrorResponse)=>{
          console.log(error.status);
          return []
        })).subscribe((data) => {
          console.log(data);
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/ecole/list']);
            });
        });
      }
    });
    console.log(ecole);
  }


  }

