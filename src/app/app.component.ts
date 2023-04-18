import { Component } from '@angular/core';
import { ConnexionService } from './services/connexion.service';
import { Personnel } from 'src/models/personnel.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Gestion-Clientele';
  nomPersonnel = "rosly";
  isLogin!: boolean;
  personnel!: Personnel

  constructor(
    private connexionService: ConnexionService,
  ){}

  ngOnInit() {

    const personnelObject = localStorage.getItem("personnel");
    console.log(personnelObject);
    if(personnelObject){
      this.personnel = JSON.parse(personnelObject);
      console.log(this.personnel)
      this.nomPersonnel = this.personnel.Nom;
      this.isLogin = true;
    }

  }


  onLogout(){
    this.connexionService.logout();
  }

}
