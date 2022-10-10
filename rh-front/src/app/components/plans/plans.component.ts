import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlanRequest } from 'src/app/models/planRequest';
import { PlanResponse } from 'src/app/models/planResponse';
import { FormationService } from 'src/app/services/formation/formation.service';

declare const $: any;

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {

  plans: PlanResponse[] = [];
  newPlan : PlanRequest = new PlanRequest();
  updPlan : PlanRequest = new PlanRequest();
  deletePlanId : number = 0;
  index : number = 0;

  message : string = '';

  constructor(private formationService: FormationService, private router : Router) { }

  ngOnInit(): void {
    this.getPlans();
  }

  getPlans() : void {
    this.formationService.getPlans().subscribe((response: PlanResponse[]) => {
      this.plans = response;   
      console.log(this.plans)
    }, err => {
      console.log(err);
    });
  }

  savePlan() {        
    this.formationService.addPlan(this.newPlan).subscribe((Response)=>{
      this.message = "This Plan well be added successfuly!";
      console.log(Response);
      $('#addPlan').modal("hide");
      this.router.navigate(['/plans']);
    }, err => {
      console.log(err);
    });    
  }

  editFormation(planId : number){    
    this.formationService.getPlanById(planId).subscribe((Response)=>{
      this.updPlan.id = Response.id;
      this.updPlan.name = Response.name;
      this.updPlan.planDate = Response.planDate;
      this.updPlan.responsableID = Response.responsable.id;
    }, err => {
      console.log(err);
    })
  }

  updatePlan() {
    this.formationService.updatePlan(this.updPlan).subscribe((Response)=>{
      this.message = "This Plan well be updated successfuly!";
      $('#updatePlan').modal("hide");
      this.router.navigate(['/Plans']);
    }, err => {
      console.log(err);
    });
  }

  confirmDeletePlan(planID : number, i : number){
    this.deletePlanId = planID;
    this.index = i;
    $('#deletePlan').modal("hide");
  }

  deletePlan(planID : number, index : number) {
    this.formationService.deletePlan(planID).subscribe((Response)=>{
      this.message = "This Plan well be deleted successfuly!";
      this.plans.splice(index, 1);
      this.router.navigate(['/plans']);
    }, err => {
      console.log(err);
    })
  }

}
