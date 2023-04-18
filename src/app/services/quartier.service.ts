import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Quartier } from 'src/models/quartier.models';

import { Router } from '@angular/router';
import { Arrondisssement } from 'src/models/arrondissement.models';

@Injectable({
  providedIn: 'root'
})
export class QuartierService {
  API_URL: string = environment.apiUrl
  uriQuartier: string = "/V1/Quartier";

 uriRessource: string = "/V1/GetResource/Arrondissement";

 uriRessources: string = "/V1/GetResource/Quartier";

  constructor(
    private http: HttpClient,
  ) { }

  //Recuperation de toutes les Quartier

  getList(): Observable<Quartier[]> {
    return this.http.post<Quartier[]>(this.API_URL, {
      method: 'GET',
      route:  this.uriQuartier,
    });
  }

  // recuperation d'une école

  get(IDQuartier: String = "0"): Observable<Quartier>{
    //if id Quartier is given get just one or get all Quartier
    const uri: string = IDQuartier != "0" ? this.uriQuartier + "/" + IDQuartier : this.uriQuartier;
    return this.http.post<Quartier>(environment.apiUrl, {route: uri, method: "GET"});
  }



  //Recuperer les arrondissements par rapport aux departement

  Recuperation(iddepartement: string): Observable<Arrondisssement[]>{
    const data = {data: {IDDEPARTEMENT: iddepartement},route: this.uriRessource, method: "POST"};
    return this.http.post<Arrondisssement[]>(environment.apiUrl, JSON.stringify(data));
  }

  //recuperer les quartiers par rapport aux arrondissements

  RecuperationArrondissement(idarrondissement: string): Observable<Quartier[]>{
    const data = {data: {IDARRONDISSEMENT: idarrondissement},route: this.uriRessources, method: "POST"};
    return this.http.post<Quartier[]>(environment.apiUrl, JSON.stringify(data));
  }

  //recuperer les quartiers par rapport aux departements

  RecuperationDepartement(iddepartement: string): Observable<Quartier[]>{
    const data = {data: {IDDEPARTEMENT: iddepartement},route: this.uriRessources, method: "POST"};
    return this.http.post<Quartier[]>(environment.apiUrl, JSON.stringify(data));
  }



  //La création

  create(Quartier: Quartier): Observable<Quartier>{
    const data = {data: Quartier, route: this.uriQuartier, method: "POST"};
    return this.http.post<Quartier>(environment.apiUrl, JSON.stringify(data));
  }

  //Mise à jour

  update(Quartier: Quartier): Observable<Quartier>{
    const data = {
      data: Quartier,
      method: "PUT",
      route: this.uriQuartier + "/" + Quartier.IDQUARTIER
    }
    return this.http.put<Quartier>(environment.apiUrl, JSON.stringify(data))
  }

  //La suppression

  delete(IDQuartier: string): Observable<Quartier> {
    const payload = {
      method: 'DELETE',
      route: `${this.uriQuartier}/${IDQuartier}`,
    };
    return this.http.post<Quartier>(this.API_URL, JSON.stringify(payload));
  }

}
