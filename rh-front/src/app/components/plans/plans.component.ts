import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Collaborateur } from 'src/app/models/collaborateur';
import { PlanRequest } from 'src/app/models/planRequest';
import { PlanResponse } from 'src/app/models/planResponse';
import { CollService } from 'src/app/services/collaborateur/coll.service';
import { FormationService } from 'src/app/services/formation/formation.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AddById } from 'src/app/models/addById';
import { FormationResponse } from 'src/app/models/formationResponse';

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
  formations : FormationResponse[] = [];
  showFormation : FormationResponse[] = [];
  
  formationId : number = 0;
  index : number = 0;
  planId : number = 0;
  case : string = 'add';

  message : string = '';

  dropdownListFormation : FormationResponse[] = [];
  dropdownListPlan : PlanResponse[] = [];
  selectedItems : any = [];
  selectedItem : number = 0;
  dropdownFormationSettings:IDropdownSettings = {};

  constructor(private formationService: FormationService, 
              private router : Router,
              private collService : CollService) { }

  ngOnInit(): void {
    this.getPlans();
    this.getCollaborateur();
    this.dropDownFormation();
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
    }, err => {
      console.log(err);
    });
  }

  getFormation() : void {
    this.formationService.getFormations().subscribe((response : FormationResponse[]) => {
      this.dropdownListFormation = response;
    }, (error) => {
      console.log(error);
    });
  }

  onAdd() {
    this.case = 'add';
  }

  savePlan() {        
    this.formationService.addPlan(this.newPlan).subscribe((response)=>{
      this.message = "This Plan well be added successfuly!";
      $('#addPlan').modal("hide");
      this.getPlans();
      this.cleanData();
    }, (err) => {
      console.log(err);
    });    
  }

  editPlan(plan : PlanResponse){
    this.newPlan.id = plan.id;
    this.newPlan.name = plan.name;
    this.newPlan.planDate = plan.planDate;
    this.newPlan.responsableID = plan.responsable.id;
    this.case = 'update';
  }

  updatePlan() {
    this.formationService.updatePlan(this.newPlan).subscribe((response)=>{
      this.message = "This Plan well be updated successfuly!";
      $('#addPlan').modal("hide");
      this.getPlans();
      this.cleanData();
    }, (err) => {
      console.log(err);
    });
  }

  confirmDeletePlan(planID : number, i : number){
    this.planId = planID;
    this.index = i;    
  }

  deletePlan(planID : number, index : number) {
    this.formationService.deletePlan(planID).subscribe((response)=>{
      this.message = "This Plan well be deleted successfuly!";
      this.plans.splice(index, 1);
      $('#deletePlan').modal("hide");
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

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  addFormatonToPlan() {    
    for (let index = 0; index < this.selectedItems.length; index++) {
      const formationID = this.selectedItems[index];
      let addById : AddById = new AddById();
      addById.id1 = formationID.id;
      addById.id2 = this.selectedItem;
      this.formationService.addFormationToPlan(addById).subscribe((response) => {
        this.message = "Successfuly!";
        $('#addFormationToPlan').modal("hide");
      }, (error) => {
        console.log(error);
      });      
    }
  }

  confirmDeleteFormFromP(formationID : number, i : number){
    this.formationId = formationID;
    this.index = i;
  }

  show(idPlan : number) {
    this.formationService.getAllFormFromPlan(idPlan).subscribe((response) => {
      this.showFormation = response;
      this.planId = idPlan;
    }, (error) => {
      console.log(error);
    });
  }

  deleteFormatonFromPlan(formationID : number) {        
    this.formationService.deleteFormationFromPlan(formationID, this.planId).subscribe((response) => {      
      this.showFormation.splice(this.index, 1);
      // $('#addFormationToPlan').modal("hide");
    }, (error) => {
      console.log(error);
    });
  }

  cleanData() {
    this.newPlan.name = '';
    this.newPlan.id = 0;
    this.newPlan.planDate = '';
    this.newPlan.responsableID = 0;
  }


  cancelBtn1() {
    this.cleanData();
    this.getPlans();
  }

}
