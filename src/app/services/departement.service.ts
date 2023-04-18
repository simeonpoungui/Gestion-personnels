import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Departement } from 'src/models/departement.models';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {
  API_URL: string = environment.apiUrl
  uriDepartement: string = "/V1/Departement";
  uriRessource: string = "/V1/GetResource/Arrondissement";

  constructor(
    private http: HttpClient,
  ) { }

  //Recuperation de toutes les Departement

  getList(): Observable<Departement[]> {
    return this.http.post<Departement[]>(this.API_URL, {
      method: 'GET',
      route:  this.uriDepartement,
    });
  }

  // recuperation d'une école

  get(IDDepartement: String = "0"): Observable<Departement>{
    //if id Departement is given get just one or get all Departement
    const uri: string = IDDepartement != "0" ? this.uriDepartement + "/" + IDDepartement : this.uriDepartement;
    return this.http.post<Departement>(environment.apiUrl, {route: uri, method: "GET"});
  }

  Recuperation(iddepartement: string): Observable<Departement[]>{
    const data = {data: {IDDEPARTEMENT: iddepartement},route: this.uriRessource, method: "POST"};
    return this.http.post<Departement[]>(environment.apiUrl, JSON.stringify(data));
  }
  

  //La création

  create(Departement: Departement): Observable<Departement>{
    const data = {data: Departement, route: this.uriDepartement, method: "POST"};
    return this.http.post<Departement>(environment.apiUrl, JSON.stringify(data));
  }

  //Mise à jour

  update(Departement: Departement): Observable<Departement>{
    const data = {
      data: Departement,
      method: "PUT",
      route: this.uriDepartement + "/" + Departement.IDDEPARTEMENT
    }
    return this.http.put<Departement>(environment.apiUrl, JSON.stringify(data))
  }

  //La suppression

  delete(IDDepartement: string): Observable<Departement> {
    const payload = {
      method: 'DELETE',
      route: `${this.uriDepartement}/${IDDepartement}`,
    };
    return this.http.post<Departement>(this.API_URL, JSON.stringify(payload));
  }

}
