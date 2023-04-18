import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PrincipalComponent } from './principal/principal.component';
import { PageNoFoundComponent } from './page-no-found/page-no-found.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { ConnexionComponent } from './forms/connexion/connexion.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { PathLocationStrategy, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import { EcoleViewComponent } from './dashboard/ecole-view/ecole-view.component';
import { EcoleComponent } from './forms/ecole/ecole.component';
import { AlertComponent } from './alert/alert.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ArrondissementViewComponent } from './dashboard/arrondissement-view/arrondissement-view.component';
import { ArrondissementComponent } from './forms/arrondissement/arrondissement.component';
import { DepartementViewComponent } from './dashboard/departement-view/departement-view.component';
import { DepartementComponent } from './forms/departement/departement.component';
import { ZoneComponent } from './forms/zone/zone.component';
import { ZoneViewComponent } from './dashboard/zone-view/zone-view.component';
import { QuartierViewComponent } from './dashboard/quartier-view/quartier-view.component';
import { QuartierComponent } from './forms/quartier/quartier.component';
import { LoadingComponent } from './loading/loading.component';
import { AlertEcoleComponent } from './alert-ecole/alert-ecole.component';
import { SocieteViewComponent } from './dashboard/societe-view/societe-view.component';
import { SocieteComponent } from './forms/societe/societe.component';
import { RetenueComponent } from './forms/retenue/retenue.component';
import { RetenueViewComponent } from './dashboard/retenue-view/retenue-view.component';
import { PrimeViewComponent } from './dashboard/prime-view/prime-view.component';
import { PrimeComponent } from './forms/prime/prime.component';
import { FicheSocieteComponent } from './dashboard/fiche-societe/fiche-societe.component';
import { NationaliteViewComponent } from './dashboard/nationalite-view/nationalite-view.component';
import { NationaliteComponent } from './forms/nationalite/nationalite.component';
import { CompteViewComponent } from './dashboard/compte-view/compte-view.component';
import { CompteComponent } from './forms/compte/compte.component';
import { PersonnelViewComponent } from './dashboard/personnel-view/personnel-view.component';
import { PersonnelComponent } from './forms/personnel/personnel.component';
import { TableRetenueViewComponent } from './dashboard/table-retenue-view/table-retenue-view.component';
import { TabGainsViewComponent } from './dashboard/tab-gains-view/tab-gains-view.component';
import { DroitPersonnelViewComponent } from './dashboard/droit-personnel-view/droit-personnel-view.component';
import {MatTabsModule} from '@angular/material/tabs';
import { CommonModule, DatePipe  } from '@angular/common';
import { ProduitViewComponent } from './dashboard/produit-view/produit-view.component';
import { ProduitComponent } from './forms/produit/produit.component';
import { LiasseViewComponent } from './dashboard/liasse-view/liasse-view.component';
import { LiasseComponent } from './forms/liasse/liasse.component';




@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    HomeComponent,
    PrincipalComponent,
    PageNoFoundComponent,
    EcoleViewComponent,
    EcoleComponent,
    AlertComponent,
    ArrondissementViewComponent,
    ArrondissementComponent,
    DepartementViewComponent,
    DepartementComponent,
    ZoneComponent,
    ZoneViewComponent,
    QuartierViewComponent,
    QuartierComponent,
    LoadingComponent,
    AlertEcoleComponent,
    SocieteViewComponent,
    SocieteComponent,
    RetenueComponent,
    RetenueViewComponent,
    PrimeViewComponent,
    PrimeComponent,
    FicheSocieteComponent,
    NationaliteViewComponent,
    NationaliteComponent,
    CompteViewComponent,
    CompteComponent,
    PersonnelViewComponent,
    PersonnelComponent,
    TableRetenueViewComponent,
    TabGainsViewComponent,
    DroitPersonnelViewComponent,
    ProduitViewComponent,
    ProduitComponent,
    LiasseViewComponent,
    LiasseComponent,

  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTableModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatChipsModule,
    MatDialogModule,
    MatTabsModule,
    CommonModule

  ],
  providers: [
    {
      provide: LocationStrategy, useClass: HashLocationStrategy
    },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
