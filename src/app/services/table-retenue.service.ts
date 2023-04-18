import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Table_retenue } from 'src/models/tableRetenue.model';
import { Personnel } from 'src/models/personnel.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableRetenueService {

  API_URL: string = environment.apiUrl

  uriGetretenue: string = "/V1/Get_All_Personnel"


  constructor(
    private http: HttpClient,
  ) { }

  //Recuperation de toutes les retenues

  getList(): Observable<Personnel[]> {
    return this.http.post<Personnel[]>(this.API_URL, {
      method: 'GET',
      route:  this.uriGetretenue,
    });
  }

  // recuperation d'une école

  get(IDRETENUE: string): Observable<Table_retenue[]>{
    const data = {data: {IDRETENUE: IDRETENUE},route: this.uriGetretenue, method: "POST"};
    return this.http.post<Table_retenue[]>(environment.apiUrl, JSON.stringify(data));
  }

  Recuperation(IDRETENUE: string): Observable<Table_retenue[]>{
    const data = {data: {IDRETENUE: IDRETENUE},route: this.uriGetretenue, method: "POST"};
    return this.http.post<Table_retenue[]>(environment.apiUrl, JSON.stringify(data));
  }

  //La création

  create(retenue: Table_retenue): Observable<Table_retenue>{
    const data = {data: retenue, route: this.uriGetretenue, method: "POST"};
    return this.http.post<Table_retenue>(environment.apiUrl, JSON.stringify(data));
  }

  //Mise à jour

  update(retenue: Table_retenue): Observable<Table_retenue>{
    const data = {
      data: retenue,
      method: "PUT",
      route: this.uriGetretenue + "/" + retenue.IDRETENUE
    }
    return this.http.put<Table_retenue>(environment.apiUrl, JSON.stringify(data))
  }

  //La suppression

  delete(IDRETENUE: string): Observable<Table_retenue> {
    const payload = {
      method: 'DELETE',
      route: `${this.uriGetretenue}/${IDRETENUE}`,
    };
    return this.http.post<Table_retenue>(this.API_URL, JSON.stringify(payload));
  }
}
