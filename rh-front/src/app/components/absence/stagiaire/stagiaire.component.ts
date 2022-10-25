import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { Router } from '@angular/router';
import { AbsenceStgRequest } from 'src/app/models/absenceStgRequest';
import { AbsenceStgResponse } from 'src/app/models/absenceStgResponse';
import { Stagiaire } from 'src/app/models/stagiaire';
import { AbsenceService } from 'src/app/services/absence/absence.service';
import { StagiaireService } from 'src/app/services/gestion-stagiaire/stagiaire.service';

declare const $ : any;

@Component({
  selector: 'app-stagiaire',
  templateUrl: './stagiaire.component.html',
  styleUrls: ['./stagiaire.component.css']
})
export class StagiaireComponent implements OnInit, AfterContentChecked {

  stagiaires : Stagiaire[] = [];
  absences : AbsenceStgResponse[] = [];
  newAbs : AbsenceStgRequest = new AbsenceStgRequest();
  abs : number[] = [];
  searchByDate : Date = new Date();
  message : string = '';


  constructor(private stgService : StagiaireService,
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

  ngAfterContentChecked(): void {
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

  addAbsence() {    

    for (let index = 0; index < this.abs.length; index++) {
      this.newAbs.stagiaireId = this.abs[index];      
      this.newAbs.dateAbs = new Date();
      this.newAbs.duree = '-';
      this.newAbs.justificatif = false;
      this.newAbs.natureAbsence = 'NONJUSTIFIEE';
      
      this.absService.addStgAbsence(this.newAbs).subscribe((response) => {
        this.message = "These Absences well be added successfuly!";
        $('#addAbsence').modal('hide');
        // this.getAllAbs();
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
      this.absService.getStgAbsByDate(this.searchByDate).subscribe((response) => {
        this.absences = response;
      }, (error) => {
        console.log(error);
      });
    }
  }

}
