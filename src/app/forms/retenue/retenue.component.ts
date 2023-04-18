import { Component, OnInit, Input } from '@angular/core';
import { RetenueService } from 'src/app/services/retenue.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Retenue } from 'src/models/retenue.models';
import { Location } from '@angular/common';

@Component({
  selector: 'app-retenue',
  templateUrl: './retenue.component.html',
  styleUrls: ['./retenue.component.scss']
})
export class RetenueComponent implements OnInit{

  IDRETENUE!: string;
  NumOrdre!: string;
  LibelleRetenue!:string;
  bDeductibleBaseImposable!:string;
  bEstCNSS!: string;
  FormuleCalcul!:string;

  isLoading!:boolean;

  @Input() action !: "create" | "edit" | "view"


  constructor(
    private retenueService: RetenueService,
    private route: ActivatedRoute,
    private router: Router,
    public _location:Location
    
  ){}

  ngOnInit(): void {
    const retenueID = this.route.snapshot.params['retenueID'];
   
    console.log(retenueID)
    if (retenueID){    
      this.initForUpdate(retenueID);
    }
  }

  isFormValid(): boolean {
    if(this.NumOrdre && this.LibelleRetenue && this.FormuleCalcul){
      return false
    }else{
      return true
    }
  }

  initForUpdate(retenueID: string){
    this.isLoading = true;
    this.retenueService.get(retenueID).subscribe((data) => {
      console.log(data)
    this.IDRETENUE = data.IDRETENUE;
    this.LibelleRetenue = data.LibelleRetenue
    this.bDeductibleBaseImposable = data.bDeductibleBaseImposable;
    this.bEstCNSS = data.bEstCNSS
     this.NumOrdre = data.NumOrdre;
     this.FormuleCalcul= data.FormuleCalcul
      this.isLoading = false;
    }, (error) => {
      this.router.navigateByUrl('404')
    })
} 

onSubmitForm(form: NgForm){
  console.log(form.value)
  const retenue: Retenue = form.value;

   retenue.IDRETENUE= this.IDRETENUE;
 

    if (this.action === "edit"){
      this.retenueService.update(retenue).subscribe((data) => {
        console.log(data);
     //   this.router.navigateByUrl("/compagnie-view")
        location.reload();
      }, error => console.log(error));
    }else {
      this.retenueService.create(retenue).subscribe((data) => {
        console.log(data)
        //this.router.navigateByUrl("/compagnie-view")
        location.reload()
      }, error => console.log(error))
    }

  }

}
