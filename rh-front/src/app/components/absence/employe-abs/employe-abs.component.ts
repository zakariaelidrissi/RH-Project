import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbsenceEmp } from 'src/app/models/absenceEmp';
import { AbsenceEmpRequest } from 'src/app/models/absenceEmpRequest';
import { AbsenceEmpResponse } from 'src/app/models/absenceEmpResponse';
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
  empName : string = '';
  absenceId : number = 0;
  index : number = 0;
  searchByDate : Date = new Date();
  file : any;

  message : string = '';

  constructor(private empolyeeServise : GestionEmployeService,
              private absService : AbsenceService,
              private router : Router) { }

  ngOnInit(): void {
    // this.searchByDate = new Date();
    // console.log('in OnInit ' + this.searchByDate);
    this.getAbsences(this.searchByDate.toDateString());
  }

  onChangeDate() {
    // this.getAllAbs();
    console.log('in onChangeDate ' + this.searchByDate);
    this.getAbsences(this.searchByDate.toDateString());
  }

  getAllEmployee(){
    this.empolyeeServise.getAllEmploye().subscribe((response) => {
      this.employes = response;      
    }, (err) => {
      console.log(err);
    })
  }

  getAbsences(date : string) {
    // console.log('date : '+this.searchByDate.toDateString());
    this.absService.getEmpAbsByDate(date).subscribe((res) => {
      this.absences = res;
      console.log(res);
    }, (error) => {
      console.log(error);
    });
  }

  getAllAbs(){
    this.absService.getEmpAbsences().subscribe((response) => {
      // this.absences = response;
      console.log(this.absences);
      // const handleButons = this.handleButons;
      // this.absences.forEach((abs,index) => {
      //   var dt : Date = new Date(abs.dateAbs);
      //   this.dashboard.setItems([abs.employe.nom, dt.toLocaleDateString(), abs.natureAbsence, abs.justificatif, abs.duree, this.actions(abs.id, index)]);
      // });
      // $('#example tbody').on('click', 'button', function (this:any,event:any) {
      //   handleButons(this);
      // });
    }, (error) => {
      console.log(error);
    });
  }

  getAbsByDate(date : string) {
    this.absService.getEmpAbsByDate(date).subscribe((response) => {
      this.absences = response;      
    }, (error) => {
      console.log(error);
    });
  }

  getAbs(date : Date){
    var abs : AbsenceEmpResponse[] = [];
    for (var i=0; i<this.absences.length; i++) {
      // if (this.absences[i].dateAbs === date){
      //   abs.push(this.absences[i]);
      // }
    }
    // this.absences = abs;
  }

  addAbsence() {    

    for (let index = 0; index < this.abs.length; index++) {
      this.newAbs.employeId = this.abs[index];      
      this.newAbs.dateAbs = new Date();
      this.newAbs.duree = '1';
      this.newAbs.justificatif = '---';
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

  search() {
    if (this.searchByDate != null) {
      // this.absService.getEmpAbsByDate(this.searchByDate).subscribe((response) => {
      //   this.absences = response;
      // }, (error) => {
      //   console.log(error);
      // });
      this.getAbs(this.searchByDate);
    }
  }

  editAbs(name : string, absence : AbsenceEmpRequest) {
    this.updAbs = absence;
    this.empName = name;
  }

  getFile(event : any) {
    this.file = event.target.files[0];        
  }

  updateAbsence() {
    this.updAbs = this.file.name;
    console.log(this.updAbs);
    this.absService.updateEmpAbs(this.updAbs).subscribe((response)=>{
      this.message = "This Absence well be updated successfuly!";
      localStorage.setItem('justificatif', JSON.stringify(this.file));
      $('#updateAbsence').modal("hide");
      this.getAllAbs();
    }, err => {
      console.log(err);
    });
  }  

  confirmDeleteAbs(absID : number, index : number) {
    this.absenceId = absID;
    this.index = index;
  }

  deleteAbsence(absenceId : number, index : number) {
    this.absService.deleteEmpAbs(absenceId).subscribe((response)=>{
      this.message = "This Absence well be deleted successfuly!";
      this.absences.splice(index, 1);
      $('#deleteAbsence').modal("hide");
    }, err => {
      console.log(err);
    });
  }

  downloadJustificative(justificatif : string) {
    return JSON.parse(localStorage.getItem('justificatif') || '')
  }

}
