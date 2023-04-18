import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Service } from 'src/models/service.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  API_URL: string = environment.apiUrl
  uriService: string = "/V1/SERVICES";


  constructor(
    private http: HttpClient,
  ) { }

  //Recuperation de toutes les services

  getList(): Observable<Service[]> {
    return this.http.post<Service[]>(this.API_URL, {
      method: 'GET',
      route:  this.uriService,
    });
  }

}
