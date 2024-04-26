import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs';

import { Exam } from 'src/app/model/exam';
import { ExamService } from '../../service/exam.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {

  displayedColumns: string[] = ['idExam', 'nameExam', 'descriptionExam', 'actions'];
  dataSource: MatTableDataSource<Exam>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private examService: ExamService,
    private _snackBar: MatSnackBar
  ) {}
  
  ngOnInit(): void {
    this.examService.getExamChange().subscribe(data => {
        this.createTable(data);
    });

    this.examService.getMessageChange().subscribe(data => {
        this._snackBar.open(data, 'INFO', {duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'});
    });

    this.examService.findAll().subscribe(data => {
        this.createTable(data);
    });
  }

  createTable(data: Exam[]){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  delete(idPatient: number){
    this.examService.delete(idPatient)
    .pipe(switchMap(()=> this.examService.findAll()))
    .subscribe(data => {
      this.createTable(data);
      this.examService.setMessageChange('DELETED!');
    });
  }

  applyFilter(e: any){
    this.dataSource.filter = e.target.value.trim();
  }

}
