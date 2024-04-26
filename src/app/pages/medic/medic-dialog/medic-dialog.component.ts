import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { Medic } from 'src/app/model/medic';
import { MedicService } from 'src/app/service/medic.service';

@Component({
  selector: 'app-medic-dialog',
  templateUrl: './medic-dialog.component.html',
  styleUrls: ['./medic-dialog.component.css'],
})
export class MedicDialogComponent implements OnInit {
  medic: Medic;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Medic,
    private _dialogRef: MatDialogRef<MedicDialogComponent>,
    private medicService: MedicService
  ) {}

  ngOnInit(): void {
    this.medic = { ...this.data };
    /*this.medic = new Medic();
      this.medic.idMedic = this.data.idMedic;
      this.medic.primaryName = this.data.primaryName;
      this.medic.surname = this.data.surname;
      this.medic.photo = this.data.photo;*/
  }

  operate() {
    if (this.medic != null && this.medic.idMedic > 0) {
      //UPDATE
      this.medicService
        .update(this.medic.idMedic, this.medic)
        .pipe(switchMap(() => this.medicService.findAll()))
        .subscribe((data) => {
          this.medicService.setMedicChange(data);
          this.medicService.setMessageChange('UPDATED!');
        });
    } else {
      //INSERT
      this.medicService
        .save(this.medic)
        .pipe(switchMap(() => this.medicService.findAll()))
        .subscribe((data) => {
          this.medicService.setMedicChange(data);
          this.medicService.setMessageChange('CREATED!');
        });
    }
    this.close();
  }

  close() {
    this._dialogRef.close();
  }
}
