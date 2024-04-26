import { Injectable } from '@angular/core';
import { Exam } from '../model/exam';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamService extends GenericService<Exam> {

  private examChange: Subject<Exam[]> = new Subject<Exam[]>
  private messageChange: Subject<string> = new Subject<string>

  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/exams`)
 }

 getExamChange(){
  return this.examChange.asObservable();
}

setExamChange(data: Exam[]){
  this.examChange.next(data);
}

getMessageChange(){
  return this.messageChange.asObservable();
}

setMessageChange(data: string){
  this.messageChange.next(data);
} 

}
