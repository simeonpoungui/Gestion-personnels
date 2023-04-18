import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ecoles, BaseUlr } from 'src/models/ecole.models';
import { Router } from '@angular/router';
import { Arrondisssement } from 'src/models/arrondissement.models';
import { Quartier } from 'src/models/quartier.models';
import { Zone } from 'src/models/zone.models';

@Injectable({
  providedIn: 'root'
})
export class EcoleService {
  API_URL: string = environment.apiUrl
  uriEcoles: string = "/V1/ECOLES";
  uriRessource : string = "/V1/GetEcoles"
  imprimesEcoles: string = "/V1/apiImprime/ListeEcoles";

  uriRessources: string = "/V1/GetResource/Arrondissement";

  uriRessourceQuartier: string = "/V1/GetResource/Quartier";

  uriRessourceZone: string = "/V1/GetResource/Zone";

  constructor(
    private http: HttpClient,
  ) { }

  //Recuperation de toutes les Ecoles

  getList(): Observable<Ecoles[]> {
    return this.http.post<Ecoles[]>(this.API_URL, {
      method: 'GET',
      route:  this.uriEcoles,
    });
  }

  // recuperation d'une école

  get(IDEcoles: String = "0"): Observable<Ecoles>{
    //if id Ecoles is given get just one or get all Ecoles
    const uri: string = IDEcoles != "0" ? this.uriEcoles + "/" + IDEcoles : this.uriEcoles;
    return this.http.post<Ecoles>(environment.apiUrl, {route: uri, method: "GET"});
  }

  RecuperationArrondissement(idarrondissement: string): Observable<Quartier[]>{
    const data = {data: {IDARRONDISSEMENT: idarrondissement},route: this.uriRessourceQuartier, method: "POST"};
    return this.http.post<Quartier[]>(environment.apiUrl, JSON.stringify(data));
  }

  //La création

  create(Ecoles: Ecoles): Observable<Ecoles>{
    const data = {data: Ecoles, route: this.uriEcoles, method: "POST"};
    return this.http.post<Ecoles>(environment.apiUrl, JSON.stringify(data));
  }


  // RecuperationArrondissement(idarrondissement: string): Observable<Ecoles[]>{
  //   const data = {data: {IDARRONDISSEMENT: idarrondissement},route: this.uriRessource, method: "POST"};
  //   return this.http.post<Ecoles[]>(environment.apiUrl, JSON.stringify(data));
  // }

  RecuperationCodeEcole(codeEtab: string): Observable<Ecoles[]>{
    const data = {data: {codeEtab:codeEtab},route: this.uriRessource, method: "POST"};
    return this.http.post<Ecoles[]>(environment.apiUrl, JSON.stringify(data));
  }


  RecuperationZone(idarrondissement: string): Observable<Zone[]>{
    const data = {data: {IDARRONDISSEMENT: idarrondissement},route: this.uriRessourceZone, method: "POST"};
    return this.http.post<Zone[]>(environment.apiUrl, JSON.stringify(data));
  }



  RecuperationCycle(iddepartement: string, idarrondissement: string,idquartier: string,idzone: string,Cycle_PrEscolaire:string,Cycle_Primaire: string, Cycle_College: string, Cycle_Lycee: string, Cycle_Superieur: string):Observable<Ecoles[]>{
      const data = {data: {IDDEPARTEMENT: iddepartement, IDARRONDISSEMENT:idarrondissement,IDQUARTIER: idquartier,IDZONE:idzone,Cycle_PrEscolaire:Cycle_PrEscolaire, Cycle_Primaire:Cycle_Primaire, Cycle_College:Cycle_College,Cycle_Lycee,
        Cycle_Superieur:Cycle_Superieur},route: this.uriRessource, method: "POST"};
        console.log(JSON.stringify(data))
      return this.http.post<Ecoles[]>(environment.apiUrl, JSON.stringify(data));
    }


    Recuperations(iddepartement: string): Observable<Arrondisssement[]>{
      const data = {data: {IDDEPARTEMENT: iddepartement},route: this.uriRessources, method: "POST"};
      return this.http.post<Arrondisssement[]>(environment.apiUrl, JSON.stringify(data));
    }
  
    Recuperation(IDDEPARTEMENT: string, IDZone: string, IDQUARTIER: string): Observable<Ecoles[]>{
      const data = {data: {IDDEPARTEMENT: IDDEPARTEMENT, IDZone:IDZone, IDQUARTIER:IDQUARTIER,},route: this.uriRessource, method: "POST"};
      return this.http.post<Ecoles[]>(environment.apiUrl, JSON.stringify(data));
    }
    
    

  //Impression du pdf

  impression(iddepartement: string, idarrondissement: string,idquartier: string,idzone: string,Cycle_PrEscolaire:string,Cycle_Primaire: string, Cycle_College: string, Cycle_Lycee: string, Cycle_Superieur: string): Observable<BaseUlr>{
    const data = {data: {IDDEPARTEMENT: iddepartement, IDARRONDISSEMENT:idarrondissement,IDQUARTIER: idquartier,IDZONE:idzone,Cycle_PrEscolaire:Cycle_PrEscolaire, Cycle_Primaire:Cycle_Primaire, Cycle_College:Cycle_College,Cycle_Lycee,
      Cycle_Superieur:Cycle_Superieur}, route: this.imprimesEcoles, method: "POST"};

      console.log(JSON.stringify(data))
    return  this.http.post<BaseUlr>(environment.apiUrl, JSON.stringify(data));
  }

  //Mise à jour

  update(Ecoles: Ecoles): Observable<Ecoles>{
    const data = {
      data: Ecoles,
      method: "PUT",
      route: this.uriEcoles + "/" + Ecoles.IDECOLES
    }
    return this.http.put<Ecoles>(environment.apiUrl, JSON.stringify(data))
  }

  //La suppression

  delete(IDECOLES: string): Observable<Ecoles> {
    const payload = {
      method: 'DELETE',
      route: `${this.uriEcoles}/${IDECOLES}`,
    };
    return this.http.post<Ecoles>(this.API_URL, JSON.stringify(payload));
  }

}
