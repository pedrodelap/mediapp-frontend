import { Injectable } from '@angular/core';
import { Medic } from '../model/medic';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { GenericService } from './generic.service';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MedicService extends GenericService<Medic> {

    private medicChange: Subject<Medic[]> = new Subject<Medic[]>
    private messageChange: Subject<string> = new Subject<string>


    constructor(protected override http: HttpClient) {
        super(http, `${environment.HOST}/medics`)
    }

    ///////////////////////////////////
    getMedicChange(){
        return this.medicChange.asObservable();
    }
    
    setMedicChange(data: Medic[]){
        this.medicChange.next(data);
    }
    
    getMessageChange(){
        return this.messageChange.asObservable();
    }
    
    setMessageChange(data: string){
        this.messageChange.next(data);
    }    

}
