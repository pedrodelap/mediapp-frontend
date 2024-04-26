import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs';
import { Patient } from 'src/app/model/patient';
import { PatientService } from 'src/app/service/patient.service';


@Component({
    selector: 'app-patient',
    templateUrl: './patient.component.html',
    styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

    displayedColumns: string[] = ['idPatient', 'firstName', 'lastName', 'dni', 'acciones']
    dataSource: MatTableDataSource<Patient>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    
    constructor(
      private patientService: PatientService,
      private _snackBar: MatSnackBar
    ) {}
  
    ngOnInit(): void {
        this.patientService.getPatientChange().subscribe(data => {
            this.createTable(data);
        });
  
        this.patientService.getMessageChange().subscribe(data => {
            this._snackBar.open(data, 'INFO', {duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'});
        });
  
        this.patientService.findAll().subscribe(data => {
            this.createTable(data);
        });
    }
  
    createTable(data: Patient[]){
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  
    delete(idPatient: number){
      this.patientService.delete(idPatient)
      .pipe(switchMap(()=> this.patientService.findAll()))
      .subscribe(data => {
        this.createTable(data);
        this.patientService.setMessageChange('DELETED!');
      });
    }
  
    applyFilter(e: any){
      this.dataSource.filter = e.target.value.trim();
    }

}
