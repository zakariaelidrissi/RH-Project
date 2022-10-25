import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Collaborateur } from 'src/app/models/collaborateur';
import { Employe } from 'src/app/models/employe';
import { FormationRequest } from 'src/app/models/formationRequest';
import { FormationResponse } from 'src/app/models/formationResponse';
import { PlanResponse } from 'src/app/models/planResponse';
import { FormationService } from 'src/app/services/formation/formation.service';

declare const $: any;

@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.css']
})
export class FormationsComponent implements OnInit {
  
  formations : FormationResponse[] = [];
  newFormation : FormationRequest = new FormationRequest();
  updFormation : FormationRequest = new FormationRequest();
  deleteFormationId : number = 0;
  plans : PlanResponse[] = [];
  employes : Collaborateur[] = [];
  index : number = 0;
  formationID : number = 0;
  employeID : number = 0;

  message : string = '';
  dr : string = 'Day(s)';

  constructor(private formationService: FormationService, private router: Router) { }

  ngOnInit(): void {    

    this.getFormations();
  }

  getFormations(): void {
    this.formationService.getFormations().subscribe((response: FormationResponse[]) => {
      this.formations = response;
      console.log(response);
    }, err => {
      console.log(err);
    });
  }

  saveFormation() {
    this.newFormation.duree += ' ' + this.dr;
    console.log(this.newFormation);      
    this.formationService.addFormation(this.newFormation).subscribe((response)=>{
      this.message = "This Formation well be added successfuly!";
      console.log(response);
      $('#addFormation').modal("hide");
      this.getFormations();
    }, err => {
      console.log(err);
    });    
  }

  editFormation(formation : FormationResponse){
    this.updFormation = formation;
  }  

  updateFormation() {
    this.formationService.updateFormation(this.updFormation).subscribe((response)=>{
      this.message = "This Formation well be updated successfuly!";
      $('#updateFormation').modal("hide");
      this.getFormations();
    }, err => {
      console.log(err);
    });
  }

  confirmDeleteFormation(formationID : number, i : number){
    this.deleteFormationId = formationID;
    this.index = i;    
  }

  deleteFormation(FormationID : number, index : number) {
    this.formationService.deleteFormation(FormationID).subscribe((response)=>{
      this.message = "This Formation well be deleted successfuly!";
      this.formations.splice(index, 1);
      $('#deleteFormation').modal("hide");      
    }, err => {
      console.log(err);
    })
  }

  showPlan(formation : FormationResponse) {
    this.plans = formation.plan;
  }

  showColl(formationId : number){
    this.formationService.getAllCollFromForm(formationId).subscribe((response) => {
      this.employes = response;
      this.formationID = formationId;
    }, (error) => {
      console.log(error);
    });
  }

  confirmDeleteEmploye(employeId : number, i : number){
    this.employeID = employeId;
    this.index = i;
  }

  deleteEmplFromFormation(collId : number){
    this.formationService.deleteCollFromFormation(collId, this.formationID).subscribe((response) => {
      this.message = "Successfuly!";
      this.employes.splice(this.index, 1);
    }, (error) => {
      console.log(error);      
    });
  }

}
