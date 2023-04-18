import { Component, OnInit } from '@angular/core';
import { ConnexionService,erreurConnexionModel } from 'src/app/services/connexion.service';
import { LoadingComponent } from 'src/app/loading/loading.component';
import { AlertEcoleComponent } from 'src/app/alert-ecole/alert-ecole.component';
import { MatDialog } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { Personnel } from 'src/models/personnel.model';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent{

  sLogin!: string;
  sPasseWord!: string;
  isPasswordVisible = false;
  isLoading!:boolean;



  constructor(private connexionService: ConnexionService,

    private router: Router,
    private dialog: MatDialog
    ) {}


    isFormValid(): boolean {
      if(this.sLogin && this.sPasseWord ){
        return false
      }else{
        return true
      }
    }


  onSubmit() {

  console.log("cliquer")

     if(this.sLogin && this.sPasseWord){
       this.isLoading = true;
       this.connexionService.login(this.sLogin, this.sPasseWord).pipe(catchError((error:HttpErrorResponse)=>{
        console.log(error.status);
        return []
      })).subscribe(
         (data) => {
         console.log(data)
         const personnel : Personnel | erreurConnexionModel = data;

         if(personnel && personnel instanceof Personnel ){
          console.log(personnel)
          localStorage.setItem("personnel",JSON.stringify(personnel))
          console.log("connecter")
          this.router.navigateByUrl('');
           window.location.reload();
         }else if(personnel && personnel  instanceof erreurConnexionModel){



          this.isLoading = false;
          const ref = this.dialog.open(AlertEcoleComponent)
          ref.componentInstance.contenu = personnel.fault.detail

         }
      
         },(error) => {
          this.isLoading = false;
          console.log(error);
          const ref = this.dialog.open(AlertEcoleComponent)
          ref.componentInstance.contenu = "Erreur serveur"
     
        }

       );

        }

  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }





}
