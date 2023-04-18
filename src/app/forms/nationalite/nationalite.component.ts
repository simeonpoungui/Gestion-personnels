import { Component, Input } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Nationalite } from 'src/models/nationalite.models';
import { NationaliteService } from 'src/app/services/nationalite.service';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { catchError } from 'rxjs';


@Component({
  selector: 'app-nationalite',
  templateUrl: './nationalite.component.html',
  styleUrls: ['./nationalite.component.scss']
})
export class NationaliteComponent {

  @Input() action !: "create" | "edit" | "view"

  IDNATIONALITE!: string;
  Nationalite!: string;
  isLoading!: boolean;
  message!: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private nationaliteService: NationaliteService,
    public _location : Location

  ) {}

  ngOnInit(): void {

    if (this.IDNATIONALITE) {
       this.initForUpdate(this.IDNATIONALITE)
    }
    console.log(this.IDNATIONALITE);
    console.log(this.action)
  }

  initForUpdate(NATIONALITEID: string) {
    this.nationaliteService.get(NATIONALITEID).pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data) => {
      console.log(data);

      this.IDNATIONALITE = data.IDNATIONALITE;
      this.Nationalite = data.Nationalite;

    });
  }

  onSubmitretenue(form: NgForm) {

    this.isLoading = true
    const Nationalite: Nationalite = form.value;

    Nationalite.IDNATIONALITE = this.IDNATIONALITE,
    Nationalite.Nationalite = this.Nationalite

    if (this.action === 'edit') {
      this.message="Modification en cours !!!"
      this.nationaliteService.update(Nationalite).pipe(catchError((error:HttpErrorResponse)=>{
        console.log(error.status);
        return []
      })).subscribe(
        (data) => {

          console.log(data);
          this.isLoading = false
          location.reload()
        },
        (Error) => console.log(Error)
      );
    } else {
      this.message="Création en cours !!!"
      this.nationaliteService.create(Nationalite).pipe(catchError((error:HttpErrorResponse)=>{
        console.log(error.status);
        return []
      })).subscribe(
        (data) => {

          console.log(data);
          this.isLoading = false
          location.reload()
        },
        (error) => console.log(error)
      );
    }
  }

}
