import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbsenceEmp } from 'src/app/models/absenceEmp';
import { AbsenceEmpRequest } from 'src/app/models/absenceEmpRequest';
import { AddById } from 'src/app/models/addById';
import { Employe } from 'src/app/models/employe';
import { AbsenceService } from 'src/app/services/absence/absence.service';
import { GestionEmployeService } from 'src/app/services/gestion-employe/gestion-employe.service';

declare const $ : any;

@Component({
  selector: 'app-employe-abs',
  templateUrl: './employe-abs.component.html',
  styleUrls: ['./employe-abs.component.css']
})
export class EmployeAbsComponent implements OnInit {

  employes : Employe[] = [];
  absences : AbsenceEmp[] = [];
  newAbs : AbsenceEmpRequest = new AbsenceEmpRequest();
  updAbs : AbsenceEmpRequest = new AbsenceEmpRequest();
  abs : number[] = [];
  oldAbs : AddById[] = [];
  empName : string = '';
  absenceId : number = 0;
  index : number = 0;
  searchByDate : Date = new Date();
  natureAbsence : string = '';
  file : any;

  message : string = '';

  constructor(private empolyeeServise : GestionEmployeService,
              private absService : AbsenceService,
              private router : Router) { }

  ngOnInit(): void {
    // this.searchByDate = new Date();
    // console.log('in OnInit ' + this.searchByDate.toString());
    this.getAbsences(this.searchByDate.toString());
    console.log(this.abs);
  }

  onChangeDate() {
    // this.getAllAbs();
    // console.log('in onChangeDate ' + this.searchByDate.toString());
    this.getAbsences(new Date(this.searchByDate.toString()).toString());
  }

  getAbsences(date : string) {
    // console.log('date : '+this.searchByDate.toDateString());
    this.absService.getEmpAbsByDate(date).subscribe((res) => {
      this.absences = res;
      console.log(res);
      this.absences.forEach(abs => {
        if (abs.status === 'yes'){
          var ab = new AddById();
          ab.id1 = abs.id;
          ab.id2 = abs.userId;
          this.oldAbs.push(ab);
          this.abs.push(abs.userId);
        }
      });
    }, (error) => {
      console.log(error);
    });
  }

  addAbsence(empId : number, natureAbsence : string) {
    this.newAbs.employeId = empId;      
      this.newAbs.dateAbs = this.searchByDate;
      this.newAbs.duree = '1';
      this.newAbs.justificatif = '';
      this.newAbs.natureAbsence = natureAbsence;

      this.absService.addEmpAbsence(this.newAbs).subscribe((response) => {
        this.message = "These Absences well be added successfuly!";
        this.getAbsences(new Date(this.searchByDate.toString()).toString());
      }, (error) => {
        console.log(error);
      });
  }

  onChange(empId: number, absId : number, natureAbsence : string) {
    let k = 0;
    for (let index = 0; index < this.abs.length; index++){
      if (this.abs[index] === empId){
        this.abs.splice(index, 1);
        this.deleteAbsence(absId);        
        k++;
      }
    }

    if (k === 0){
      this.abs.push(empId);
      this.addAbsence(empId, natureAbsence);
      console.log('added ' + empId);
      console.log(this.abs);
    }    

  }

  deleteAbsence(absenceId : number) {
    this.absService.deleteEmpAbs(absenceId).subscribe((response)=>{
      // this.message = "This Absence well be deleted successfuly!";
      this.getAbsences(new Date(this.searchByDate.toString()).toString());
    }, err => {
      console.log(err);
    });
  }

}
