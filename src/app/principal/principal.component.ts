import { Component } from '@angular/core';
import { ConnexionService } from '../services/connexion.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent {

  constructor(
    private connexionService: ConnexionService
  ){}

  onLogout(){
    this.connexionService.logout();
  }

}
