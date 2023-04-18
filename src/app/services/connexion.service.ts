import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Connexion } from 'src/models/connexion.models';
import { Personnel } from 'src/models/personnel.model';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {
  API_URL: string = environment.apiUrl
  uriConnexion: string = "/V1/Connexion";



  constructor(
    private http: HttpClient,
    private router : Router
  ) { }



   login(sLogin: string, sPasseWord: string): Observable<Personnel | erreurConnexionModel>{
     const data = {data: {},route: this.uriConnexion + "/" + sLogin+ "/" + sPasseWord, method: "POST"};
     console.log(JSON.stringify(data))
     return this.http.post<Personnel | erreurConnexionModel>(environment.apiUrl, JSON.stringify(data));
   }


     logout() {
      localStorage.clear();
      window.location.reload();
     }

}

export class erreurConnexionModel {

  fault!:{

       faultcode: string,
       faultstring:string,
       detail:string
      
      } 


}
