import { Component, Input } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { Liasse } from 'src/models/Liasse.models';
import { LiasseService } from 'src/app/services/liasse.service';
import { Location } from '@angular/common';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-liasse',
  templateUrl: './liasse.component.html',
  styleUrls: ['./liasse.component.scss']
})
export class LiasseComponent {

  @Input() action !: "create" | "edit" | "view"

  IDLIASSE!: string;
  CodeLiasse!: string;
  LibelleLiasse!:string;
  isLoading!: boolean;
  message!: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private liasse: LiasseService,
    public _location : Location

  ) {}

  ngOnInit(): void {

    if (this.IDLIASSE) {
       this.initForUpdate(this.IDLIASSE)
    }
    console.log(this.IDLIASSE);
    console.log(this.action)
  }

  initForUpdate(LIASSEID: string) {
    this.liasse.get(LIASSEID).pipe(catchError((error:HttpErrorResponse)=>{
      console.log(error.status);
      return []
    })).subscribe((data) => {
      console.log(data);

      this.IDLIASSE = data.IDLIASSE;
      this.CodeLiasse = data.CodeLiasse;
      this.LibelleLiasse = data.LibelleLiasse;

    });
  }

  onSubmitliasse(form: NgForm) {

    this.isLoading = true
    const liasse: Liasse = form.value;

    liasse.IDLIASSE = this.IDLIASSE,
    liasse.CodeLiasse = this.CodeLiasse
    liasse.LibelleLiasse = this.LibelleLiasse

    

    if (this.action === 'edit') {
      this.message="Modification en cours !!!"
      this.liasse.update(liasse).pipe(catchError((error:HttpErrorResponse)=>{
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
      this.liasse.create(liasse).pipe(catchError((error:HttpErrorResponse)=>{
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
