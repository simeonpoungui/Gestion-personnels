import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Zone } from 'src/models/zone.models';
import { Arrondisssement } from 'src/models/arrondissement.models';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {
  API_URL: string = environment.apiUrl
  uriZone: string = "/V1/Zone";
  uriRessource: string = "/V1/GetResource/Zone";
  uriRessources: string = "/V1/GetResource/Arrondissement";
  

  constructor(
    private http: HttpClient,
  ) { }

  //Recuperation de toutes les Zone

  getList(): Observable<Zone[]> {
    return this.http.post<Zone[]>(this.API_URL, {
      method: 'GET',
      route:  this.uriZone,
    });
  }

   //Recupereration des zones par rapport aux arrondissements

   Recuperation(idarrondissement: string): Observable<Zone[]>{
    const data = {data: {IDARRONDISSEMENT: idarrondissement},route: this.uriRessource, method: "POST"};
    return this.http.post<Zone[]>(environment.apiUrl, JSON.stringify(data));
  }


  //Recupereration des zones par rapport aux departements

  RecuperationDepartement(iddepartement: string): Observable<Zone[]>{
    const data = {data: {IDDEPARTEMENT: iddepartement},route: this.uriRessource, method: "POST"};
    return this.http.post<Zone[]>(environment.apiUrl, JSON.stringify(data));
  }
  

  //Recupereration de tous arrondissements par rapport aux Departements
  RecuperationAll(iddepartement: string): Observable<Arrondisssement[]>{
    const data = {data: {IDDEPARTEMENT: iddepartement},route: this.uriRessources, method: "POST"};
    return this.http.post<Arrondisssement[]>(environment.apiUrl, JSON.stringify(data));
  }
  
 
   Recuperations(iddepartement: string): Observable<Arrondisssement[]>{
      const data = {data: {IDDEPARTEMENT: iddepartement},route: this.uriRessources, method: "POST"};
      return this.http.post<Arrondisssement[]>(environment.apiUrl, JSON.stringify(data));
    }
  
  

  get(IDZone: String = "0"): Observable<Zone>{
    //if id Zone is given get just one or get all Zone
    const uri: string = IDZone != "0" ? this.uriZone + "/" + IDZone : this.uriZone;
    return this.http.post<Zone>(environment.apiUrl, {route: uri, method: "GET"});
  }

  //La création

  create(Zone: Zone): Observable<Zone>{
    const data = {data: Zone, route: this.uriZone, method: "POST"};
    return this.http.post<Zone>(environment.apiUrl, JSON.stringify(data));
  }

  //Mise à jour

  update(Zone: Zone): Observable<Zone>{
    const data = {
      data: Zone,
      method: "PUT",
      route: this.uriZone + "/" + Zone.IDZone
    }
    return this.http.put<Zone>(environment.apiUrl, JSON.stringify(data))
  }

  //La suppression

  delete(IDZone: string): Observable<Zone> {
    const payload = {
      method: 'DELETE',
      route: `${this.uriZone}/${IDZone}`,
    };
    return this.http.post<Zone>(this.API_URL, JSON.stringify(payload));
  }

}
