import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbsenceEmp } from 'src/app/models/absenceEmp';
import { AbsenceStgRequest } from 'src/app/models/absenceStgRequest';
import { AddById } from 'src/app/models/addById';
import { Stagiaire } from 'src/app/models/stagiaire';
import { AbsenceService } from 'src/app/services/absence/absence.service';
import { StagiaireService } from 'src/app/services/gestion-stagiaire/stagiaire.service';

declare const $ : any;

@Component({
  selector: 'app-stagiaire',
  templateUrl: './stagiaire.component.html',
  styleUrls: ['./stagiaire.component.css']
})
export class StagiaireComponent implements OnInit {

  stagiaires : Stagiaire[] = [];
  absences : AbsenceEmp[] = [];
  newAbs : AbsenceStgRequest = new AbsenceStgRequest();
  abs : number[] = [];
  oldAbs : AddById[] = [];
  searchByDate : Date = new Date();
  message : string = '';

  constructor(private stgService : StagiaireService,
              private absService : AbsenceService,
              private router : Router) { }

  ngOnInit(): void {    
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
    this.absService.getStgAbsByDate(date).subscribe((res) => {
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

  addAbsence(stgId : number, natureAbsence : string) {
    this.newAbs.stagiaireId = stgId;      
    this.newAbs.dateAbs = this.searchByDate;
    this.newAbs.duree = '1';
      this.newAbs.justificatif = '';
    this.newAbs.natureAbsence = natureAbsence;

    this.absService.addStgAbsence(this.newAbs).subscribe((response) => {
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
    this.absService.deleteStgAbs(absenceId).subscribe((response)=>{
      this.message = "This Absence well be deleted successfuly!";
    }, err => {
      console.log(err);
    });
  }

}
