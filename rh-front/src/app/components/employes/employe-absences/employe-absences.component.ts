import { Component, OnInit, ViewChild } from '@angular/core';
import { AbsenceEmpResponse } from 'src/app/models/absenceEmpResponse';
import { AbsenceService } from 'src/app/services/absence/absence.service';
import { DashboardComponent } from '../../dashboard/dashboard.component';

@Component({
  selector: 'app-employe-absences',
  templateUrl: './employe-absences.component.html',
  styleUrls: ['./employe-absences.component.css']
})
export class EmployeAbsencesComponent implements OnInit {

  empId : number = 2;
  absences : AbsenceEmpResponse[] = [];

  @ViewChild(DashboardComponent) dashboard!: DashboardComponent;
  
  constructor(private absService : AbsenceService) { }

  ngOnInit(): void {
    this.getAllEmpAbs(this.empId);
  }

  getAllEmpAbs(empId : number){
    this.absService.getEmpAbsencesById(empId).subscribe((res) => {
      this.absences = res;
      console.log(res);
      this.absences.forEach(abs => {
        var dt: Date = new Date(abs.dateAbs);
        // console.log(index);
        this.dashboard.setItems([abs.id.toString(), dt.toLocaleDateString(), abs.natureAbsence, abs.duree]);
      });
    })
  }

}
