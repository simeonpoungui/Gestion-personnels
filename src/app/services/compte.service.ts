import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Compte } from 'src/models/compte.models';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CompteService {

  API_URL: string = environment.apiUrl
  uriCompte: string = "/V1/pCOMPTE";
  uriGetCompte: string = "/V1/GET_COMPTE"
  uricomptesupprime = "/V1/CompteSupprime"
  uricompteview = "/V1/COMPTE"
  listecompte = "/V1/CompteVersListe"


  constructor(
    private http: HttpClient,
  ) { }



  getList(): Observable<Compte[]> {
    return this.http.post<Compte[]>(this.API_URL, {
      method: 'GET',
      route:  this.uriCompte,
    });
  }

  getListCompte(): Observable<Compte[]> {
    return this.http.post<Compte[]>(this.API_URL, {
      method: 'GET',
      route:  this.listecompte,
    });
  }

  // recuperation d'un compte

  get(IDCOMPTE: String = "0"): Observable<Compte>{
    const uri: string = IDCOMPTE != "0" ? this.uricompteview + "/" + IDCOMPTE : this.uricompteview;
    return this.http.post<Compte>(environment.apiUrl, {route: uri, method: "GET"});
  }


  Recuperation(IDCOMPTE: string,CodeCompte:string, PersonneAssociee:string,TypePersonneAssociee:string,Classe:string): Observable<Compte[]>{
    const data = {data: {IDCOMPTE: IDCOMPTE, CodeCompte: CodeCompte, PersonneAssociee: PersonneAssociee, TypePersonneAssociee:TypePersonneAssociee, Classe:Classe},route: this.uriGetCompte, method: "POST"};
    return this.http.post<Compte[]>(environment.apiUrl, JSON.stringify(data));
  }

  //La création

  create(Compte: Compte): Observable<Compte>{
    const data = {data: Compte, route: this.uriCompte, method: "POST"};
    return this.http.post<Compte>(environment.apiUrl, JSON.stringify(data));
  }

  //Mise à jour

  update(Compte: Compte): Observable<Compte>{
    const data = {
      data: Compte,
      method: "PUT",
      route: this.uriCompte + "/" + Compte.IDCOMPTE
    }
    return this.http.put<Compte>(environment.apiUrl, JSON.stringify(data))
  }

  //La suppression

  delete(IDCOMPTE: string): Observable<Compte> {
    const payload = {
      method: 'DELETE',
      route: `${this.uricomptesupprime}/${IDCOMPTE}`,
    };
    return this.http.post<Compte>(this.API_URL, JSON.stringify(payload));
  }

}
