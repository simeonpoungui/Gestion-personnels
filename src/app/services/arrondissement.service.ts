import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Arrondisssement } from 'src/models/arrondissement.models';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ArrondisssementService {
  API_URL: string = environment.apiUrl
  uriArrondisssement: string = "/V1/Arrondissement";
  uriRessource: string = "/V1/GetResource/Arrondissement";

  constructor(
    private http: HttpClient,
  ) { }

  //Recuperation de toutes les Arrondisssement

  getList(): Observable<Arrondisssement[]> {
    return this.http.post<Arrondisssement[]>(this.API_URL, {
      method: 'GET',
      route:  this.uriArrondisssement,
    });
  }

  // recuperation d'une école

  get(IDArrondisssement: String = "0"): Observable<Arrondisssement>{
    //if id Arrondisssement is given get just one or get all Arrondisssement
    const uri: string = IDArrondisssement != "0" ? this.uriArrondisssement + "/" + IDArrondisssement : this.uriArrondisssement;
    return this.http.post<Arrondisssement>(environment.apiUrl, {route: uri, method: "GET"});
  }

  Recuperation(iddepartement: string): Observable<Arrondisssement[]>{
    const data = {data: {IDDEPARTEMENT: iddepartement},route: this.uriRessource, method: "POST"};
    return this.http.post<Arrondisssement[]>(environment.apiUrl, JSON.stringify(data));
  }

  //La création

  create(Arrondisssement: Arrondisssement): Observable<Arrondisssement>{
    const data = {data: Arrondisssement, route: this.uriArrondisssement, method: "POST"};
    return this.http.post<Arrondisssement>(environment.apiUrl, JSON.stringify(data));
  }

  //Mise à jour

  update(Arrondisssement: Arrondisssement): Observable<Arrondisssement>{
    const data = {
      data: Arrondisssement,
      method: "PUT",
      route: this.uriArrondisssement + "/" + Arrondisssement.IDARRONDISSEMENT
    }
    return this.http.put<Arrondisssement>(environment.apiUrl, JSON.stringify(data))
  }

  //La suppression

  delete(IDArrondisssement: string): Observable<Arrondisssement> {
    const payload = {
      method: 'DELETE',
      route: `${this.uriArrondisssement}/${IDArrondisssement}`,
    };
    return this.http.post<Arrondisssement>(this.API_URL, JSON.stringify(payload));
  }

}
