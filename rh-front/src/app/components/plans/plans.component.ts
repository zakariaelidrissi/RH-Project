import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Collaborateur } from 'src/app/models/collaborateur';
import { PlanRequest } from 'src/app/models/planRequest';
import { PlanResponse } from 'src/app/models/planResponse';
import { CollService } from 'src/app/services/collaborateur/coll.service';
import { FormationService } from 'src/app/services/formation/formation.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AddById } from 'src/app/models/addById';
import { FormationResponse } from 'src/app/models/formationResponse';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { formatDate } from '@angular/common';

declare const $: any;

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {

  plans: PlanResponse[] = [];
  Collaborateurs: Collaborateur[] = [];
  newPlan: PlanRequest = new PlanRequest();
  formations: FormationResponse[] = [];
  showFormation: FormationResponse[] = [];

  formationId: number = 0;
  index: number = 0;
  planId: number = 0;
  case: string = 'add';

  message: string = '';

  dropdownListFormation : FormationResponse[] = [];
  dropdownListPlan : PlanResponse[] = [];
  selectedItems : any = [];
  selectedItem : number = 0;
  dropdownFormationSettings:IDropdownSettings = {};
  errors : any = [];


  @ViewChild(DashboardComponent) dashboard!: DashboardComponent;

  constructor(private formationService: FormationService,
    private router: Router,
    private collService: CollService) { }

  ngOnInit(): void {
    this.getPlans();
    this.getCollaborateur();
    this.dropDownFormation();
  }
  
  actions(planId : number, index: number) {
    return '<div id_='+planId+' index_='+index+' class="me-auto d-flex">'+
              '<button type_="editPlan" class="btn btn-warning me-2 btn-sm"'+
                  'data-bs-toggle="modal" data-bs-target="#addPlan">'+
                  '<i class="bi bi-pencil-square"></i>'+
              '</button>'+
              '<button type_="show" class="btn btn-success me-2 btn-sm"'+
                  'data-bs-target="#showFormations" data-bs-toggle="modal">'+
                  '<i class="bi bi-eye-fill"></i>'+
              '</button>'+
              '<button type_="confirmDeletePlan" class="btn btn-danger btn-sm"'+
                  'data-bs-toggle="modal" data-bs-target="#deletePlan">'+
                  '<i class="bi bi-trash3-fill"></i>'+
              '</button>'+
          '</div>';
  }
 
  getCollaborateur() : void {
    this.collService.getCollaborateur().subscribe((response : Collaborateur[]) => {
      this.Collaborateurs = response;
    }, (err) => {
      console.log(err);
    });
  }

  getPlans(): void {
    this.formationService.getPlans().subscribe((response: PlanResponse[]) => {
      this.plans = response;
      this.dropdownListPlan = response;
      const handleButons = this.handleButons;
      this.plans.forEach((plan, index) => {
        var dt: Date = new Date(plan.planDate);
        var userName = plan.responsable.employe.user.nom + ' ' + plan.responsable.employe.user.prenom
        this.dashboard.setItems([plan.name, dt.toLocaleDateString(), userName, this.actions(plan.id, index)]);
      });
      $('#example tbody').on('click', 'button', function (this: any, event: any) {
        handleButons(this);
      });
    }, err => {
      console.log(err);
    });
  }

  handleButons = (button: any) => {
    const type = button.getAttribute("type_");
    const id_ = button.parentNode.getAttribute("id_");
    const index_ = button.parentNode.getAttribute("index_");
    console.log(type, id_)
    if (type === "editPlan") {
      this.editPlan(this.plans.find(f => f.id == id_) as PlanResponse);
    } else if (type === "show") {
      this.show(id_);
    } else if (type === "confirmDeletePlan") {
      this.confirmDeletePlan(id_, index_);
    }
  }

  getFormation(): void {
    this.formationService.getFormations().subscribe((response: FormationResponse[]) => {
      this.dropdownListFormation = response;
    }, (error) => {
      console.log(error);
    });
  }

  onAdd() {
    this.case = 'add';
    this.cleanData();
  }

  addPlan() {
    if(this.newPlan.name && this.newPlan.planDate && this.newPlan.responsableID){
      this.errors['full'] = "";
      if (formatDate(this.newPlan.planDate, 'yyyy/MM/dd', 'en') >= formatDate(new Date(), 'yyyy/MM/dd', 'en') ){
        this.savePlan();
        this.errors['date'] = '';
      }else {
        this.errors['date'] = "la date doit superieur ou egale à la date d'aujourd'hui!";
      }
    }else {
      this.errors['full'] = "tout les champs est obligatoire!";
    }
  }

  savePlan() {        
    this.formationService.addPlan(this.newPlan).subscribe((response)=>{
      this.message = "This Plan well be added successfuly!";
      $('#addPlan').modal("hide");
      this.dashboard.clear();
      this.getPlans();
      this.cleanData();
    }, (err) => {
      console.log(err);
    });
  }

  editPlan(plan: PlanResponse) {
    this.newPlan.id = plan.id;
    this.newPlan.name = plan.name;
    this.newPlan.planDate = plan.planDate;
    this.newPlan.responsableID = plan.responsable.id;
    this.case = 'update';
  }

  updatePlan() {
    this.formationService.updatePlan(this.newPlan).subscribe((response) => {
      this.message = "This Plan well be updated successfuly!";
      $('#addPlan').modal("hide");
      this.dashboard.clear();
      this.getPlans();
    }, (err) => {
      console.log(err);
    });
  }

  confirmDeletePlan(planID: number, i: number) {
    this.planId = planID;
    this.index = i;
  }

  deletePlan(index: number) {
    this.formationService.deletePlan(this.planId).subscribe((response) => {
      this.message = "This Plan well be deleted successfuly!";
      this.plans.splice(index, 1);
      this.dashboard.clear();
      this.getPlans();
      $('#deletePlan').modal("hide");
    }, (err) => {
      console.log(err);
    })
  }

  dropDownFormation() {

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
      let addById: AddById = new AddById();
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

  confirmDeleteFormFromP(formationID: number, i: number) {
    this.formationId = formationID;
    this.index = i;
  }

  show(idPlan: number) {
    this.formationService.getAllFormFromPlan(idPlan).subscribe((response) => {
      this.showFormation = response;
      this.planId = idPlan;
    }, (error) => {
      console.log(error);
    });
  }

  deleteFormatonFromPlan() {
    this.formationService.deleteFormationFromPlan(this.formationId, this.planId).subscribe((response) => {
      this.showFormation.splice(this.index, 1);
      $('#deleteFormFromPlan').modal("hide");
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

}
