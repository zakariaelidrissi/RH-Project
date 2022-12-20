import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AbsenceEmp } from 'src/app/models/absenceEmp';
import { AbsenceEmpRequest } from 'src/app/models/absenceEmpRequest';
import { AbsenceEmpResponse } from 'src/app/models/absenceEmpResponse';
import { Employe } from 'src/app/models/employe';
import { AbsenceService } from 'src/app/services/absence/absence.service';
import { GestionEmployeService } from 'src/app/services/gestion-employe/gestion-employe.service';
import { DashboardComponent } from '../../dashboard/dashboard.component';

declare const $ : any;

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.css']
})
export class EmployeComponent implements OnInit {

  employes : Employe[] = [];
  absences : AbsenceEmpResponse[] = [];
  absence : AbsenceEmp[] = [];
  newAbs : AbsenceEmpRequest = new AbsenceEmpRequest();
  updAbs : AbsenceEmpRequest = new AbsenceEmpRequest();
  abs : number[] = [];
  empName : string = '';
  absenceId : number = 0;
  index : number = 0;
  searchByDate : Date = new Date();
  file : any;

  message : string = '';

  @ViewChild(DashboardComponent) dashboard!:DashboardComponent;

  constructor(private empolyeeServise : GestionEmployeService,
              private absService : AbsenceService,
              private router : Router) { }

  ngOnInit(): void {
    this.getAllEmployee();
    this.getAllAbs();      
  }

  actions(absId : number, index: number) {
    return '<div id_='+absId+' index_='+index+' class="me-auto d-flex">'+
              '<button type_="editAbs" class="btn btn-warning me-2 btn-sm"'+
                  'data-bs-toggle="modal" data-bs-target="#updateAbsence">'+
                  '<i class="bi bi-pencil-square"></i>'+
              '</button>'+
              '<button type_="confirmDeleteAbs" class="btn btn-danger btn-sm"'+
                  'data-bs-toggle="modal" data-bs-target="#deleteAbsence">'+
                  '<i class="bi bi-trash3-fill"></i>'+
              '</button>'+
            '</div>';
  }

  handleButons=(button:any)=>{
    const type = button.getAttribute("type_");
    const id_ = button.parentNode.getAttribute("id_");
    const index_ = button.parentNode.getAttribute("index_");

    if(type === "editAbs"){
      this.editAbs(this.absences.find(f=>f.id == id_)!.employe.nom, this.absences.find(f=>f.id == id_) as AbsenceEmpResponse);
    }else if(type === "dropDownFormation"){
      this.confirmDeleteAbs(id_, index_);
    }
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
      const handleButons = this.handleButons;
      this.absences.forEach((abs,index) => {
        var dt : Date = new Date(abs.dateAbs);
        this.dashboard.setItems([abs.employe.nom, dt.toLocaleDateString(), abs.natureAbsence, abs.justificatif, abs.duree, this.actions(abs.id, index)]);
      });
      $('#example tbody').on('click', 'button', function (this:any,event:any) {
        handleButons(this);
      } );
    }, (error) => {
      console.log(error);
    });
  }

  getAbsByDate(date : string) {
    this.absService.getEmpAbsByDate(date).subscribe((response) => {
      this.absence = response;      
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
