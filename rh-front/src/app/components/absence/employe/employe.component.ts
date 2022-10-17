import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbsenceEmpRequest } from 'src/app/models/absenceEmpRequest';
import { AbsenceEmpResponse } from 'src/app/models/absenceEmpResponse';
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
  absences : AbsenceEmpResponse[] = [];
  newAbs : AbsenceEmpRequest = new AbsenceEmpRequest();
  abs : number[] = [];

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
    this.getAllAbs();
  }

  getAllEmployee(){
    this.empolyeeServise.getAllEmploye().subscribe((response) => {
      this.employes = response;
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

    for (let index = 0; index < this.abs.length; index++) {
      this.newAbs.employeId = this.abs[index];      
      this.newAbs.dateAbs = new Date();
      this.newAbs.duree = '-';
      this.newAbs.justificatif = false;
      this.newAbs.natureAbsence = 'NONJUSTIFIEE';
      
      this.absService.addEmpAbsence(this.newAbs).subscribe((response) => {
        this.message = "These Absences well be added successfuly!";
        $('#addAbsence').modal('hide');
        this.getAllAbs();
      }, (error) => {
        console.log(error);
      });
    }

    
  }

  onChange(empId: number) {    
    let k = 0;
    for (let index = 0; index < this.abs.length; index++){
      if (this.abs[index] === empId){
        this.abs.splice(index, 1);        
        k++;
      }
    }

    if (k === 0){
      this.abs.push(empId);
      console.log('added ' + empId);
      console.log(this.abs);
    }    

  }

}
