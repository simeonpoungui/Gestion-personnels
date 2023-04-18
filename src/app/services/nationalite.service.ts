import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Nationalite } from 'src/models/nationalite.models';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NationaliteService {
  API_URL: string = environment.apiUrl
  uriNationalite: string = "/V1/NATIONALITE";


  constructor(
    private http: HttpClient,
  ) { }

  //Recuperation de toutes les Nationalite

  getList(): Observable<Nationalite[]> {
    return this.http.post<Nationalite[]>(this.API_URL, {
      method: 'GET',
      route:  this.uriNationalite,
    });
  }

  // recuperation d'une école

  get(IDNationalite: String = "0"): Observable<Nationalite>{
    //if id Nationalite is given get just one or get all Nationalite
    const uri: string = IDNationalite != "0" ? this.uriNationalite + "/" + IDNationalite : this.uriNationalite;
    return this.http.post<Nationalite>(environment.apiUrl, {route: uri, method: "GET"});
  }

  

  //La création

  create(Nationalite: Nationalite): Observable<Nationalite>{
    const data = {data: Nationalite, route: this.uriNationalite, method: "POST"};
    return this.http.post<Nationalite>(environment.apiUrl, JSON.stringify(data));
  }

  //Mise à jour

  update(Nationalite: Nationalite): Observable<Nationalite>{
    const data = {
      data: Nationalite,
      method: "PUT",
      route: this.uriNationalite + "/" + Nationalite.IDNATIONALITE
    }
    return this.http.put<Nationalite>(environment.apiUrl, JSON.stringify(data))
  }

  //La suppression

  delete(IDNationalite: string): Observable<Nationalite> {
    const payload = {
      method: 'DELETE',
      route: `${this.uriNationalite}/${IDNationalite}`,
    };
    return this.http.post<Nationalite>(this.API_URL, JSON.stringify(payload));
  }

}
