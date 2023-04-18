import { Injectable } from '@angular/core';
import { Produits } from 'src/models/produit.models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  API_URL: string = environment.apiUrl
  uriProduits: string = "/V1/PRODUIT";
  uriProduitsCreation: string ="/V1/CreationProduit/"

  constructor(
    private http: HttpClient,
  ) { }


  getList(): Observable<Produits[]> {
    return this.http.post<Produits[]>(this.API_URL, {
      method: 'GET',
      route:  this.uriProduits,
    });
  }

  // recuperation d'une école

  get(IDPRODUIT: String = "0"): Observable<Produits>{
    //if id Produits is given get just one or get all Produits
    const uri: string = IDPRODUIT != "0" ? this.uriProduits + "/" + IDPRODUIT : this.uriProduits;
    return this.http.post<Produits>(environment.apiUrl, {route: uri, method: "GET"});
  }


   //La création

   create(Produits: Produits, IdUtilisateur: string ): Observable<Produits>{
    const data = {data: Produits, route: this.uriProduitsCreation  + IdUtilisateur, method: "POST"};
    return this.http.post<Produits>(environment.apiUrl, JSON.stringify(data));
  }




  //La suppression

  delete(IDProduits: string): Observable<Produits> {
    const payload = {
      method: 'DELETE',
      route: `${this.uriProduits}/${IDProduits}`,
    };
    return this.http.post<Produits>(this.API_URL, JSON.stringify(payload));
  }


}
