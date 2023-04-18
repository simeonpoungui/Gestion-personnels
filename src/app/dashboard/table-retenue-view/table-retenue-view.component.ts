import { Component,OnInit ,ViewChild, Input  } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/alert/alert.component';
import { TableRetenueService } from 'src/app/services/table-retenue.service';
import { Table_retenue } from 'src/models/tableRetenue.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-table-retenue-view',
  templateUrl: './table-retenue-view.component.html',
  styleUrls: ['./table-retenue-view.component.scss']
})
export class TableRetenueViewComponent {

  @Input() listeRetenue !: Array<Table_retenue>

  dataSource!: any;
  displayedColumns = [

    "NumOrdre",
    "LibelleRetenue",
    "Montant"

  ];



  tableRetenueList!: Table_retenue[]

    isLoading!:boolean;

  constructor(
    private tableretenueService: TableRetenueService,
    private router:Router,
    private dialog: MatDialog,
    public _location:Location
  ) { }

  ngOnInit(): void {
    this.initTablaRetenue();
    console.log(this.listeRetenue)

  }
    @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  initTablaRetenue() {this.isLoading=true;
      this.isLoading=false;
      this.dataSource = new MatTableDataSource(this.listeRetenue);
             this.dataSource.sort = this.sort;
         this.dataSource.paginator = this.paginator;

  }

    applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }



}
