import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Personnel } from 'src/models/personnel.model';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {
  API_URL: string = environment.apiUrl
  uriPersonnel: string = "/V1/GETListePersonnel";
  uriCreation: string = "/V1/CreationPersonnel/"
  uriPersonnelID: string ="/V1/PERSONNELS/";




  constructor(
    private http: HttpClient,
  ) { }

  //Recuperation de toutes les Personnel

  // getList(): Observable<Personnel[]> {
  //   return this.http.post<Personnel[]>(this.API_URL, {
  //     method: 'GET',
  //     route:  this.uriPersonnel,
  //   });
  // }


  Recuperation(idpersonnel: string, civilite: string, idservice: string, etatcompte: string): Observable<Personnel[]>{
    const data = {data: {nIDPERSONNEL: idpersonnel, Civilite:civilite, IDSERVICE:idservice, EtatCompte: etatcompte,},
    route: this.uriPersonnel, method: "POST",};
    return this.http.post<Personnel[]>(environment.apiUrl, JSON.stringify(data));
  }




  // recuperation d'une école

  get(nIDPERSONNEL: String = "0"): Observable<Personnel>{
    //if id Personnel is given get just one or get all Personnel
    const uri: string = nIDPERSONNEL != "0" ? this.uriPersonnelID + "/" + nIDPERSONNEL : this.uriPersonnelID;
    return this.http.post<Personnel>(environment.apiUrl, {route: uri, method: "GET"});
  }


  //La création

  create(Personnel: Personnel, IdUtilisateur: string ): Observable<Personnel>{
    const data = {
      data: Personnel,
      method: "POST",
      route: this.uriCreation + IdUtilisateur,
     };
    console.log(JSON.stringify(data))
    return this.http.post<Personnel>(environment.apiUrl, JSON.stringify(data));
  }

  //Mise à jour

  update(Personnel: Personnel): Observable<Personnel>{
    const data = {
      data: Personnel,
      method: "PUT",
      route: this.uriPersonnel + "/" + Personnel.nIDPERSONNEL
    }
    return this.http.put<Personnel>(environment.apiUrl, JSON.stringify(data))
  }

  //La suppression

  delete(IDPERSONNEL: string): Observable<Personnel> {
    const payload = {
      method: 'DELETE',
      route: `${this.uriPersonnelID}/${IDPERSONNEL}`,
    };
    return this.http.post<Personnel>(this.API_URL, JSON.stringify(payload));
  }



}
