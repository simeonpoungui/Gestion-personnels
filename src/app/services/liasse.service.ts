import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Liasse } from 'src/models/Liasse.models';

@Injectable({
  providedIn: 'root'
})
export class LiasseService {

  API_URL: string = environment.apiUrl
  uriLiasse: string = "/V1/LIASSE";

  constructor(
    private http: HttpClient,
  ) { }


  getList(): Observable<Liasse[]> {
    return this.http.post<Liasse[]>(this.API_URL, {
      method: 'GET',
      route:  this.uriLiasse,
    });
  }


  get(IDliasse: String = "0"): Observable<Liasse>{
    //if id Nationalite is given get just one or get all Nationalite
    const uri: string = IDliasse != "0" ? this.uriLiasse + "/" + IDliasse : this.uriLiasse;
    return this.http.post<Liasse>(environment.apiUrl, {route: uri, method: "GET"});
  }

  

  //La création

  create(liasse: Liasse): Observable<Liasse>{
    const data = {data: liasse, route: this.uriLiasse, method: "POST"};
    return this.http.post<Liasse>(environment.apiUrl, JSON.stringify(data));
  }

  //Mise à jour

  update(liasse: Liasse): Observable<Liasse>{
    const data = {
      data: liasse,
      method: "PUT",
      route: this.uriLiasse + "/" + liasse.IDLIASSE
    }
    return this.http.put<Liasse>(environment.apiUrl, JSON.stringify(data))
  }

  //La suppression

  delete(IDliasse: string): Observable<Liasse> {
    const payload = {
      method: 'DELETE',
      route: `${this.uriLiasse}/${IDliasse}`,
    };
    return this.http.post<Liasse>(this.API_URL, JSON.stringify(payload));
  }

}
