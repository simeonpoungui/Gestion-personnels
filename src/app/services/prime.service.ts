import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Prime } from 'src/models/prime.models';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PRIMEService {
  API_URL: string = environment.apiUrl
  uriPrime: string = "/V1/PRIME";


  constructor(
    private http: HttpClient,
  ) { }

  //Recuperation de toutes les PRIME

  getList(): Observable<Prime[]> {
    return this.http.post<Prime[]>(this.API_URL, {
      method: 'GET',
      route:  this.uriPrime,
    });
  }

  // recuperation d'une école

  get(IDPrime: String = "0"): Observable<Prime>{
    //if id Prime is given get just one or get all Prime
    const uri: string = IDPrime != "0" ? this.uriPrime + "/" + IDPrime : this.uriPrime;
    return this.http.post<Prime>(environment.apiUrl, {route: uri, method: "GET"});
  }



  //La création

  create(Prime: Prime): Observable<Prime>{
    const data = {data: Prime, route: this.uriPrime, method: "POST"};
    return this.http.post<Prime>(environment.apiUrl, JSON.stringify(data));
  }

  //Mise à jour

  update(Prime: Prime): Observable<Prime>{
    const data = {
      data: Prime,
      method: "PUT",
      route: this.uriPrime + "/" + Prime.IDPRIME
    }
    return this.http.put<Prime>(environment.apiUrl, JSON.stringify(data))
  }

  //La suppression

  delete(IDPrime: string): Observable<Prime> {
    const payload = {
      method: 'DELETE',
      route: `${this.uriPrime}/${IDPrime}`,
    };
    return this.http.post<Prime>(this.API_URL, JSON.stringify(payload));
  }

}
