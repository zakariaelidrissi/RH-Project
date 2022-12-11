import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AbsenceStgRequest } from 'src/app/models/absenceStgRequest';
import { AbsenceStgResponse } from 'src/app/models/absenceStgResponse';
import { Stagiaire } from 'src/app/models/stagiaire';
import { AbsenceService } from 'src/app/services/absence/absence.service';
import { StagiaireService } from 'src/app/services/gestion-stagiaire/stagiaire.service';
import { DashboardComponent } from '../../dashboard/dashboard.component';

declare const $ : any;

@Component({
  selector: 'app-stagiaire',
  templateUrl: './stagiaire.component.html',
  styleUrls: ['./stagiaire.component.css']
})
export class StagiaireComponent implements OnInit {

  stagiaires : Stagiaire[] = [];
  absences : AbsenceStgResponse[] = [];
  newAbs : AbsenceStgRequest = new AbsenceStgRequest();
  updAbs : AbsenceStgRequest = new AbsenceStgRequest();
  abs : number[] = [];
  stgName : string = '';
  absenceId : number = 0;
  index : number = 0;
  searchByDate : Date = new Date();
  file : any;
  message : string = '';

  @ViewChild(DashboardComponent) dashboard!:DashboardComponent;

  constructor(private stgService : StagiaireService,
              private absService : AbsenceService,
              private router : Router) { }

  ngOnInit(): void {    
    this.getAllEmployee();
    this.getAllAbs();
  }

  actions(absId : number, index: number) {
    return '<div id_='+absId+' index_='+index+' class="me-auto d-flex">'+
              '<button type_="editAbs" class="btn btn-warning me-2 btn-sm"'+
                  'data-bs-toggle="modal" data-bs-target="#updateAbsence" (click)="editAbs(absence.employe.nom, absence)">'+
                  '<i class="bi bi-pencil-square"></i>'+
              '</button>'+
              '<button type_="confirmDeleteAbs" class="btn btn-danger btn-sm"'+
                  'data-bs-toggle="modal" data-bs-target="#deleteAbsence" (click)="confirmDeleteAbs(absence.id, i)">'+
                  '<i class="bi bi-trash3-fill"></i>'+
              '</button>'+
          '</div>';
  }

  // handleButons=(button:any)=>{
  //   const type = button.getAttribute("type_");
  //   const id_ = button.parentNode.getAttribute("id_");
  //   const index_ = button.parentNode.getAttribute("index_");

  //   if(type === "editAbs"){
  //     this.editAbs(this.absences.find(f=>f.id == id_)!.employe.nom, this.absences.find(f=>f.id == id_) as AbsenceEmpResponse);
  //   }else if(type === "dropDownFormation"){
  //     this.confirmDeleteAbs(id_, index_);
  //   }
  // }
  
  onChangeDate() {
    this.getAllAbs();
  }

  getAllEmployee(){
    this.stgService.getStagiaire().subscribe((response) => {
      this.stagiaires = response;
    }, (err) => {
      console.log(err);
    })
  }

  getAllAbs(){
    this.absService.getStgAbsences().subscribe((response) => {
      this.absences = response;
    }, (error) => {
      console.log(error);
    });
  }

  getAbsByDate(date : Date) {
    this.absService.getStgAbsByDate(date).subscribe((response) => {
      this.absences = response;
    }, (error) => {
      console.log(error);
    });
  }

  getAbs(date : Date){
    var abs : AbsenceStgResponse[] = [];
    for (var i=0; i<this.absences.length; i++) {
      if (this.absences[i].dateAbs === date){
        abs.push(this.absences[i]);
      }
    }
    this.absences = abs;
  }

  addAbsence() {    

    for (let index = 0; index < this.abs.length; index++) {
      this.newAbs.stagiaireId = this.abs[index];      
      this.newAbs.dateAbs = new Date();
      this.newAbs.duree = '1';
      this.newAbs.justificatif = '';
      this.newAbs.natureAbsence = 'NONJUSTIFIEE';
      
      this.absService.addStgAbsence(this.newAbs).subscribe((response) => {
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

  editAbs(name : string, absence : AbsenceStgRequest) {
    this.updAbs = absence;
    this.stgName = name;
  }

  updateAbsence() {
    

    this.absService.updateStgAbs(this.updAbs).subscribe((response)=>{
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
    this.absService.deleteStgAbs(absenceId).subscribe((response)=>{
      this.message = "This Absence well be deleted successfuly!";
      this.absences.splice(index, 1);
      $('#deleteAbsence').modal("hide");
    }, err => {
      console.log(err);
    });
  }

  search() {
    if (this.searchByDate != null) {
      this.absService.getStgAbsByDate(this.searchByDate).subscribe((response) => {
        this.absences = response;
      }, (error) => {
        console.log(error);
      });
    }
  }

}
