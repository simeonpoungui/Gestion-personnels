import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Retenue } from 'src/models/retenue.models';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RetenueService {
  API_URL: string = environment.apiUrl
  uriRetenue: string = "/V1/RETENUE";


  constructor(
    private http: HttpClient,
  ) { }

  //Recuperation de toutes les Retenue

  getList(): Observable<Retenue[]> {
    return this.http.post<Retenue[]>(this.API_URL, {
      method: 'GET',
      route:  this.uriRetenue,
    });
  }

  // recuperation d'une école

  get(IDRetenue: String = "0"): Observable<Retenue>{
    //if id Retenue is given get just one or get all Retenue
    const uri: string = IDRetenue != "0" ? this.uriRetenue + "/" + IDRetenue : this.uriRetenue;
    return this.http.post<Retenue>(environment.apiUrl, {route: uri, method: "GET"});
  }



  //La création

  create(Retenue: Retenue): Observable<Retenue>{
    const data = {data: Retenue, route: this.uriRetenue, method: "POST"};
    return this.http.post<Retenue>(environment.apiUrl, JSON.stringify(data));
  }

  //Mise à jour

  update(Retenue: Retenue): Observable<Retenue>{
    const data = {
      data: Retenue,
      method: "PUT",
      route: this.uriRetenue + "/" + Retenue.IDRETENUE
    }
    return this.http.put<Retenue>(environment.apiUrl, JSON.stringify(data))
  }

  //La suppression

  delete(IDRetenue: string): Observable<Retenue> {
    const payload = {
      method: 'DELETE',
      route: `${this.uriRetenue}/${IDRetenue}`,
    };
    return this.http.post<Retenue>(this.API_URL, JSON.stringify(payload));
  }

}
