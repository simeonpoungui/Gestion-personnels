import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-alert-ecole',
  templateUrl: './alert-ecole.component.html',
  styleUrls: ['./alert-ecole.component.scss']
})
export class AlertEcoleComponent {
  @Input() contenu!: string;
  @Input() type!: "danger" | "info" | "warning";
}
