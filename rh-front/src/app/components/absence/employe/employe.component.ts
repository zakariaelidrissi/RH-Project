import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbsenceEmpRequest } from 'src/app/models/absenceEmpRequest';
import { AbsenceEmpResponse } from 'src/app/models/absenceEmpResponse';
import { Employe } from 'src/app/models/employe';
import { AbsenceService } from 'src/app/services/absence/absence.service';
import { GestionEmployeService } from 'src/app/services/gestion-employe/gestion-employe.service';
import {HttpClient} from '@angular/common/http';

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
              private router : Router,
              private http : HttpClient) { }

  ngOnInit(): void {
    this.getAllEmployee();
    this.getAllAbs();
    setTimeout(() => {
      $('.absence').DataTable( {
        pagingType : 'simple_numbers',
        pageLength : 5,
        processing : true,
        lengthMenu : [5, 10, 25],
        order : [[1, 'desc']]
      });
    }, 1);    
  }

  onChangeDate() {
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

  getAbs(date : Date){
    var abs : AbsenceEmpResponse[] = [];
    for (var i=0; i<this.absences.length; i++) {
      if (this.absences[i].dateAbs === date){
        abs.push(this.absences[i]);
      }
    }
    this.absences = abs;
  }

  addAbsence() {    

    for (let index = 0; index < this.abs.length; index++) {
      this.newAbs.employeId = this.abs[index];      
      this.newAbs.dateAbs = new Date();
      this.newAbs.duree = '-';
      this.newAbs.justificatif = '';
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

  updateAbsence() {
    

    this.absService.updateEmpAbs(this.updAbs).subscribe((response)=>{
      this.message = "This Absence well be updated successfuly!";
      $('#updateAbsence').modal("hide");
      this.getAllAbs();
    }, err => {
      console.log(err);
    });
  }

  getFile(event : any) {
    this.file = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = (e:any) => {

    }
    
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

}
