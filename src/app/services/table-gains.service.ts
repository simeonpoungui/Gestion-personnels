import { Injectable } from '@angular/core';
import { Table_gain } from 'src/models/table_gain.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personnel } from 'src/models/personnel.model';

@Injectable({
  providedIn: 'root'
})
export class TableGainsService {


  API_URL: string = environment.apiUrl
  uriGetgain: string = "/V1/Get_All_Personnel"


  constructor(
    private http: HttpClient,
  ) { }

  //Recuperation de toutes les gains

  getList(): Observable<Personnel[]> {
    return this.http.post<Personnel[]>(this.API_URL, {
      method: 'GET',
      route:  this.uriGetgain,
    });
  }

  // recuperation d'un gain

  get(IDPRIME: string): Observable<Table_gain[]>{
    const data = {data: {IDPRIME: IDPRIME},route: this.uriGetgain, method: "POST"};
    return this.http.post<Table_gain[]>(environment.apiUrl, JSON.stringify(data));
  }

  Recuperation(IDPRIME: string): Observable<Table_gain[]>{
    const data = {data: {IDPRIME: IDPRIME},route: this.uriGetgain, method: "POST"};
    return this.http.post<Table_gain[]>(environment.apiUrl, JSON.stringify(data));
  }

  //La création

  create(gain: Table_gain): Observable<Table_gain>{
    const data = {data: gain, route: this.uriGetgain, method: "POST"};
    return this.http.post<Table_gain>(environment.apiUrl, JSON.stringify(data));
  }

  //Mise à jour

  update(gain: Table_gain): Observable<Table_gain>{
    const data = {
      data: gain,
      method: "PUT",
      route: this.uriGetgain + "/" + gain.IDPRIME
    }
    return this.http.put<Table_gain>(environment.apiUrl, JSON.stringify(data))
  }


}
