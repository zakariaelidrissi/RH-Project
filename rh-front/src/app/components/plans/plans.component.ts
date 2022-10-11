import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Collaborateur } from 'src/app/models/collaborateur';
import { PlanRequest } from 'src/app/models/planRequest';
import { PlanResponse } from 'src/app/models/planResponse';
import { CollService } from 'src/app/services/collaborateur/coll.service';
import { FormationService } from 'src/app/services/formation/formation.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Formation } from 'src/app/models/formation';

declare const $: any;

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {

  plans: PlanResponse[] = [];
  Collaborateurs : Collaborateur[] = [];
  newPlan : PlanRequest = new PlanRequest();
  updPlan : PlanRequest = new PlanRequest();
  formations : Formation[] = []
  
  deletePlanId : number = 0;
  index : number = 0;

  message : string = '';

  dropdownListFormation : Formation[] = [];
  dropdownListPlan : PlanResponse[] = [];
  selectedItems : any = [];
  selectedItem : any = [];
  dropdownFormationSettings:IDropdownSettings = {};
  dropdownPlanSettings:IDropdownSettings = {};

  constructor(private formationService: FormationService, 
              private router : Router,
              private collService : CollService) { }

  ngOnInit(): void {
    this.getPlans();
    this.getCollaborateur();
    this.dropDownFormation();
    this.dropDownPlan();
  }

  getCollaborateur() : void {
    this.collService.getCollaborateur().subscribe((response : Collaborateur[]) => {
      this.Collaborateurs = response;
    }, (err) => {
      console.log(err);
    });
  }

  getPlans() : void {
    this.formationService.getPlans().subscribe((response: PlanResponse[]) => {
      this.plans = response;
      this.dropdownListPlan = response;
      // console.log(this.plans);
    }, err => {
      console.log(err);
    });
  }

  getFormation() : void {
    this.formationService.getFormations().subscribe((response : Formation[]) => {
      this.dropdownListFormation = response;
    }, (error) => {
      console.log(error);
    });
  }

  savePlan() {        
    this.formationService.addPlan(this.newPlan).subscribe((response)=>{
      this.message = "This Plan well be added successfuly!";
      $('#addPlan').modal("hide");
      this.router.navigate(['/plans']);
    }, (err) => {
      console.log(err);
    });    
  }

  editFormation(planId : number){    
    this.formationService.getPlanById(planId).subscribe((response)=>{
      this.updPlan.id = response.id;
      this.updPlan.name = response.name;
      this.updPlan.planDate = response.planDate;
      this.updPlan.responsableID = response.responsable.id;
    }, (err) => {
      console.log(err);
    })
  }

  updatePlan() {
    this.formationService.updatePlan(this.updPlan).subscribe((response)=>{
      this.message = "This Plan well be updated successfuly!";
      $('#updatePlan').modal("hide");
      this.router.navigate(['/Plans']);
    }, (err) => {
      console.log(err);
    });
  }

  confirmDeletePlan(planID : number, i : number){
    this.deletePlanId = planID;
    this.index = i;
    $('#deletePlan').modal("hide");
  }

  deletePlan(planID : number, index : number) {
    this.formationService.deletePlan(planID).subscribe((response)=>{
      this.message = "This Plan well be deleted successfuly!";
      this.plans.splice(index, 1);
      this.router.navigate(['/plans']);
    }, (err) => {
      console.log(err);
    })
  }

  dropDownFormation(){
    
    this.getFormation();

    this.selectedItems = [];

    this.dropdownFormationSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
  }

  dropDownPlan(){
    
    this.getPlans();

    this.selectedItem = [];

    this.dropdownPlanSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  addFormatonToPlan() {
    for (let index = 0; index < this.selectedItems.length; index++) {
      const element = this.selectedItems[index];
      console.log('id : ' + element.id);
      $('#addFormationToPlan').modal("hide");
    }
  }

}
