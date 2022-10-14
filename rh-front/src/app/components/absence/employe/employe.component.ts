import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbsenceRequest } from 'src/app/models/absenceRequest';
import { AbsenceResponse } from 'src/app/models/absenceResponse';
import { Employe } from 'src/app/models/employe';
import { AbsenceService } from 'src/app/services/absence/absence.service';
import { GestionEmployeService } from 'src/app/services/gestion-employe/gestion-employe.service';

declare const $ : any;

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.css']
})
export class EmployeComponent implements OnInit {

  employes : Employe[] = [];
  absences : AbsenceResponse[] = [];
  newAbs : AbsenceRequest[] = [];

  message : string = '';

  constructor(private empolyeeServise : GestionEmployeService,
              private absService : AbsenceService,
              private router : Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      $('.absence').DataTable( {
        pagingType : 'simple_numbers',
        pageLength : 5,
        processing : true,
        lengthMenu : [5, 10, 25],
        order : [[1, 'desc']]
      });
    }, 1);
    this.getAllEmployee();
  }

  getAllEmployee(){
    this.empolyeeServise.getAllEmploye().subscribe((Response) => {
      this.employes = Response;
    }, (err) => {
      console.log(err);
    })
  }

  getAllAbs(){
    this.absService.getEmpAbsences().subscribe((response) => {
      this.absences = response;
    }, (error) => {
      console.log(error);
    });
  }

  getAbsByDate(date : Date) {
    this.absService.getEmpAbsByDate(date).subscribe((response) => {
      this.absences = response;
    }, (error) => {
      console.log(error);
    });
  }

  addAbsence() {
    for (let index = 0; index < this.newAbs.length; index++) {
      this.absService.addEmpAbsence(this.newAbs[index]).subscribe((response) => {
        
      }, (error) => {
        console.log(error);
      });
    }
  }

}
