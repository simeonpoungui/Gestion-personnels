import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Societe } from 'src/models/societe.models';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SocieteService {
  API_URL: string = environment.apiUrl
  uriSociete: string = "/V1/Societe"


  constructor(
    private http: HttpClient,
  ) { }

  //Recuperation de toutes les Societe

  getList(): Observable<Societe[]> {
    return this.http.post<Societe[]>(this.API_URL, {
      method: 'GET',
      route:  this.uriSociete,
    });
  }

  // recuperation d'une école

  get(IDSociete: String = "0"): Observable<Societe>{
    //if id Societe is given get just one or get all Societe
    const uri: string = IDSociete != "0" ? this.uriSociete + "/" + IDSociete : this.uriSociete;
    return this.http.post<Societe>(environment.apiUrl, {route: uri, method: "GET"});
  }



  //La création

  create(Societe: Societe): Observable<Societe>{
    const data = {data: Societe, route: this.uriSociete, method: "POST"};
    return this.http.post<Societe>(environment.apiUrl, JSON.stringify(data));
  }

  //Mise à jour

  update(Societe: Societe): Observable<Societe>{
    const data = {
      data: Societe,
      method: "PUT",
      route: this.uriSociete + "/" + Societe.IDSociete
    }
    return this.http.put<Societe>(environment.apiUrl, JSON.stringify(data))
  }

  //La suppression

  delete(IDSociete: string): Observable<Societe> {
    const payload = {
      method: 'DELETE',
      route: `${this.uriSociete}/${IDSociete}`,
    };
    return this.http.post<Societe>(this.API_URL, JSON.stringify(payload));
  }

}
