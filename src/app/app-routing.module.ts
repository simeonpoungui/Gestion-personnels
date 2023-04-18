import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNoFoundComponent } from './page-no-found/page-no-found.component';
import { EcoleComponent } from './forms/ecole/ecole.component';
import { EcoleViewComponent } from './dashboard/ecole-view/ecole-view.component';
import { AlertComponent } from './alert/alert.component';
import { ArrondissementViewComponent } from './dashboard/arrondissement-view/arrondissement-view.component';
import { ArrondissementComponent } from './forms/arrondissement/arrondissement.component';
import { DepartementViewComponent } from './dashboard/departement-view/departement-view.component';
import { DepartementComponent } from './forms/departement/departement.component';
import { ZoneComponent } from './forms/zone/zone.component';
import { ZoneViewComponent } from './dashboard/zone-view/zone-view.component';
import { QuartierComponent } from './forms/quartier/quartier.component';
import { QuartierViewComponent } from './dashboard/quartier-view/quartier-view.component';
import { LoadingComponent } from './loading/loading.component';
import { SocieteViewComponent } from './dashboard/societe-view/societe-view.component';
import { SocieteComponent } from './forms/societe/societe.component';
import { RetenueComponent } from './forms/retenue/retenue.component';
import { RetenueViewComponent } from './dashboard/retenue-view/retenue-view.component';
import { PrimeComponent } from './forms/prime/prime.component';
import { PrimeViewComponent } from './dashboard/prime-view/prime-view.component';
import { FicheSocieteComponent } from './dashboard/fiche-societe/fiche-societe.component';
import { NationaliteComponent } from './forms/nationalite/nationalite.component';
import { NationaliteViewComponent } from './dashboard/nationalite-view/nationalite-view.component';
import { Compte } from 'src/models/compte.models';
import { CompteViewComponent } from './dashboard/compte-view/compte-view.component';
import { CompteComponent } from './forms/compte/compte.component';
import { PersonnelViewComponent } from './dashboard/personnel-view/personnel-view.component';
import { PersonnelComponent } from './forms/personnel/personnel.component';
import { TableRetenueViewComponent } from './dashboard/table-retenue-view/table-retenue-view.component';
import { DroitPersonnelViewComponent } from './dashboard/droit-personnel-view/droit-personnel-view.component';
import { ProduitViewComponent } from './dashboard/produit-view/produit-view.component';
import { ProduitComponent } from './forms/produit/produit.component';
import { LiasseComponent } from './forms/liasse/liasse.component';
import { LiasseViewComponent } from './dashboard/liasse-view/liasse-view.component';


const routes: Routes = [

  {path: "", component: HomeComponent},
   {path: "loading", component: LoadingComponent},

  //Ecole
  {path: "ecole/list", component: EcoleViewComponent},
  {path: "ecole/ajout", component: EcoleComponent},
  {path: "ecole/:action/:ecoleID", component: EcoleComponent},

  {path: "droitPersonnel/list", component: DroitPersonnelViewComponent},
  {path: "droitPersonnel/:action/:IDpersonnel", component: DroitPersonnelViewComponent},
  {path: "droitPersonnel/ajout", component: DroitPersonnelViewComponent},

  {path: "table-retenue", component: TableRetenueViewComponent},

  {path: "arrondissement/list", component: ArrondissementViewComponent},
  {path: "arrondissement/ajout", component: ArrondissementComponent},
  {path: "arrondissement/:action/:arrondissementID", component: ArrondissementComponent},

  {path: "departement/list", component: DepartementViewComponent},
  {path: "departement/ajout", component: DepartementComponent},
  {path: "departement/:action/:departementID", component: DepartementComponent},

  {path: "zone/list", component: ZoneViewComponent},
  {path: "zone/ajout", component: ZoneComponent},
  {path: "zone/:action/:zoneID/:departementID", component: ZoneComponent},

  {path: "societe/list", component: SocieteViewComponent},
  {path: "societe/ajout", component: SocieteComponent},
  {path: "societe/:action/:societeID", component: SocieteComponent},

  {path: 'fiche-Societe/:societeID', component: FicheSocieteComponent},

  {path: "retenue/list", component: RetenueViewComponent},
  {path: "retenue/ajout", component: RetenueComponent},
  {path: "retenue/:action/:retenueID", component: RetenueComponent},

  {path: "prime_et_Retenue/list", component: PrimeViewComponent},
  {path: "prime/ajout", component: PrimeComponent},
  {path: "prime/:action/:primeID", component: PrimeComponent},

  {path: "nationalite/list", component: NationaliteViewComponent},
  {path: "nationalite/:action/:nationaliteID", component: NationaliteComponent},

  {path: "quartier/list", component: QuartierViewComponent},
  {path: "quartier/ajout", component: QuartierComponent},
  {path: "quartier/:action/:quartierID/:departementID", component: QuartierComponent},

  {path: "compte/list", component: CompteViewComponent},
  {path: "compte/ajout", component: CompteComponent},
  {path: "compte/:action/:compteID", component: CompteComponent},

  {path: "personnel/list", component: PersonnelViewComponent},
  {path: "personnel/ajout", component: PersonnelComponent},
  {path: "personnel/:action/:personnelID", component: PersonnelComponent},


  {path: 'produit/list', component: ProduitViewComponent},
  {path: 'produit/ajout', component: ProduitComponent},
  {path: 'produit/:action/:produitID', component: ProduitComponent},

  {path: 'liasse/list', component: LiasseViewComponent},
  {path: 'liasse/ajout', component: LiasseComponent},
  {path: 'liasse/:action/:liasseID', component: LiasseComponent},

  {path: "alert", component: AlertComponent},


  {path: "**", component: PageNoFoundComponent},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
