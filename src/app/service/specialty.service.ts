import { Injectable } from '@angular/core';
import { Specialty } from '../model/specialty';
import { GenericService } from './generic.service';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService extends GenericService<Specialty> {

  private specialtyChange: Subject<Specialty[]> = new Subject<Specialty[]>
  private messageChange: Subject<string> = new Subject<string>

  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/specialties`)
  }

  getSpecialtyChange(){
    return this.specialtyChange.asObservable();
  }

  setSpecialtyChange(data: Specialty[]){
      this.specialtyChange.next(data);
  }

  getMessageChange(){
      return this.messageChange.asObservable();
  }

  setMessageChange(data: string){
      this.messageChange.next(data);
  }

}
