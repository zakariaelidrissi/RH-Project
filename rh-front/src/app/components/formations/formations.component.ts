import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Collaborateur } from 'src/app/models/collaborateur';
import { FormationRequest } from 'src/app/models/formationRequest';
import { FormationResponse } from 'src/app/models/formationResponse';
import { PlanResponse } from 'src/app/models/planResponse';
import { FormationService } from 'src/app/services/formation/formation.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CollService } from 'src/app/services/collaborateur/coll.service';
import { AddById } from 'src/app/models/addById';

declare const $: any;

@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.css']
})
export class FormationsComponent implements OnInit {
  
  formations : FormationResponse[] = [];
  newFormation : FormationRequest = new FormationRequest();
  plans : PlanResponse[] = [];
  employes : Collaborateur[] = [];
  index : number = 0;
  formationID : number = 0;
  employeID : number = 0;
  case : string = 'add';

  message : string = '';

  dropdownListColl : any = [];
  // listColl : any = [];
  selectedItems : any = [];
  selectedItem : number = 0;
  dropdownCollSettings:IDropdownSettings = {};

  constructor(private formationService: FormationService, private router: Router, private collService : CollService) { }

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

  onAdd() {
    this.case = 'add';
  }

  saveFormation() {   
    this.case = 'add';     
    this.formationService.addFormation(this.newFormation).subscribe((response)=>{
      this.message = "Cette information a été ajoutée avec succès!";
      console.log(response);
      $('#addFormation').modal("hide");
      this.getFormations();
      this.cleanData();
    }, err => {
      console.log(err);
    });    
  }

  editFormation(formation : FormationResponse){
    this.newFormation = formation;
    this.case = 'update';
  }  

  updateFormation() {
    this.formationService.updateFormation(this.newFormation).subscribe((response)=>{
      this.message = "This Formation well be updated successfuly!";
      $('#addFormation').modal("hide");
      this.getFormations();
      this.cleanData();
    }, err => {
      console.log(err);
    });
  }

  confirmDeleteFormation(formationId : number, i : number){
    this.formationID = formationId;
    this.index = i;    
  }

  deleteFormation(FormationID : number, index : number) {
    this.formationService.deleteFormation(FormationID).subscribe((response)=>{
      this.message = "This Formation well be deleted successfuly!";
      this.formations.splice(index, 1);
      $('#deleteFormation').modal("hide");      
    }, err => {
      console.log(err);
    });
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

  cleanData() {
    this.newFormation.duree = '';
    this.newFormation.name = '';
    this.newFormation.id = 0;
    this.newFormation.objectif = '';
    this.newFormation.formationDate = new Date();
  }

  getColl(){
    this.collService.getColl().subscribe((response) => {      
      this.dropdownListColl = response;            
    }, (error) => {
      console.log(error);
    });
  }

  dropDownFormation(formationId : number){
    
    this.getColl();
    this.selectedItem = formationId;   

    this.selectedItems = [];

    this.dropdownCollSettings = {
      singleSelection: false,
      idField: 'id',
      textField: "name",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
  }

  addCollToFormaton() {    
    for (let index = 0; index < this.selectedItems.length; index++) {
      const collId = this.selectedItems[index];
      let addById : AddById = new AddById();
      addById.id1 = collId.id;
      addById.id2 = this.selectedItem;
      this.formationService.addCollToFormation(addById).subscribe((response) => {
        this.message = "Successfuly!";
        $('#addCollToFormation').modal("hide");
      }, (error) => {
        console.log(error);
      });      
    }
  }

  addCollToForm() {    
    console.log('formation id : ' + this.selectedItem);
    for (let index = 0; index < this.selectedItems.length; index++) {
      const collId = this.selectedItems[index];
      let addById : AddById = new AddById();
      addById.id1 = collId.id;
      addById.id2 = this.selectedItem;
      console.log(addById);     
    }
  }

  cancelBtn1() {
    this.cleanData();
    this.getFormations();
  }

}
