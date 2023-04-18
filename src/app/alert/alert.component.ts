import {Component,Input} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
 
  @Input() contenu!: string;
  @Input() type!: "danger" | "info" | "warning";
}
