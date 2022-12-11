import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Collaborateur } from 'src/app/models/collaborateur';
import { FormationRequest } from 'src/app/models/formationRequest';
import { FormationResponse } from 'src/app/models/formationResponse';
import { PlanResponse } from 'src/app/models/planResponse';
import { FormationService } from 'src/app/services/formation/formation.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CollService } from 'src/app/services/collaborateur/coll.service';
import { AddById } from 'src/app/models/addById';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DatePipe, formatDate } from '@angular/common';
import { Errors } from 'src/app/models/errors';

declare const $: any;

@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.css']
})
export class FormationsComponent implements OnInit {

  formations: FormationResponse[] = [];
  newFormation: FormationRequest = new FormationRequest();
  plans: PlanResponse[] = [];
  employes: Collaborateur[] = [];
  index: number = 0;
  formationID: number = 0;
  employeID: number = 0;
  case: string = 'add';

  message: string = '';

  dropdownListColl: any = [];
  // listColl : any = [];
  selectedItems : any = [];
  selectedItem : number = 0;
  dropdownCollSettings:IDropdownSettings = {};
  errors : any = [];

  @ViewChild(DashboardComponent) dashboard!: DashboardComponent;

  constructor(private formationService: FormationService, 
              private router: Router, 
              private collService : CollService,
              private datePipe: DatePipe) {}

  ngOnInit(): void {

    this.getFormations();
    // this.addFormation();
  }

  actions(formationId : number, index: number) {
    return '<div id_='+formationId+' index_='+index+' class="me-auto d-flex">'+
              '<button  type_="dropDown" class="btn btn-primary me-2 btn-sm"'+
                  'data-bs-toggle="modal" data-bs-target="#addCollToFormation">'+
                  '<i class="bi bi-plus-circle-fill"></i>'+
              '</button>'+
              '<button type_="editFormation" class="btn btn-warning me-2 btn-sm"'+
                  'data-bs-toggle="modal" data-bs-target="#addFormation">'+
                  '<i class="bi bi-pencil-square"></i>'+
              ' </button>'+
              '<button type_="showPlan" class="btn btn-success me-2 btn-sm"'+
                '   data-bs-toggle="modal" data-bs-target="#show">'+
                  '<i class="bi bi-eye-fill"></i>'+
              '</button>'+
              '<button type_="showColl" class="btn btn-primary me-2 btn-sm"'+
                  ' data-bs-toggle="modal" data-bs-target="#showColl">'+
                  '<i class="bi bi-eyeglasses"></i>'+
              '</button>'+
              '<button type_="confirmDeleteFormation" class="btn btn-danger btn-sm"'+
                  ' data-bs-toggle="modal" data-bs-target="#deleteFormation">'+
                  '<i class="bi bi-trash3-fill"></i>'+
              '</button>'+
            '</div>';
  }

  getFormations(): void {
    this.formationService.getFormations().subscribe((response: FormationResponse[]) => {
      this.formations = response;
      const handleButons = this.handleButons;
      this.formations.forEach((form, index) => {
        var dt: Date = new Date(form.formationDate);
        // console.log(index);
        this.dashboard.setItems([form.name, dt.toLocaleDateString(), form.duree, form.objectif, this.actions(form.id, index)]);
      });
      $('#example tbody').on('click', 'button', function (this: any, event: any) {
        handleButons(this);
      });
      console.log(response);
    }, err => {
      console.log(err);
    });
  }

  handleButons = (button: any) => {
    const type = button.getAttribute("type_");
    const id_ = button.parentNode.getAttribute("id_");
    const index_ = button.parentNode.getAttribute("index_");    

    if(type === "dropDown"){
      this.dropDownFormation(id_);
    } else if (type === "editFormation") {
      this.editFormation(this.formations.find(f => f.id == id_) as FormationResponse, index_);
    } else if (type === "showPlan") {
      this.showPlan(this.formations.find(f => f.id == id_) as FormationResponse);
    } else if (type === "showColl") {
      this.showColl(id_);
    } else if (type === "confirmDeleteFormation") {
      this.confirmDeleteFormation(id_, index_);
    }
  }

  onAdd() {
    this.case = 'add';
    this.cleanData();
  }

  formatDate = function(date: Date){
    var dateOut = new Date(date);
    return dateOut;
};

  addFormation() {
    
    if(this.newFormation.name && this.newFormation.duree && this.newFormation.formationDate && this.newFormation.objectif){
      this.errors['full'] = "";
      if (formatDate(this.newFormation.formationDate, 'yyyy/MM/dd', 'en') >= formatDate(new Date(), 'yyyy/MM/dd', 'en') ){
        this.saveFormation();
        this.errors['date'] = '';
      }else {
        this.errors['date'] = "la date doit superieur ou egale à la date d'aujourd'hui!";
      }
    }else {
      this.errors['full'] = "tout les champs est obligatoire!";
    }
  }

  saveFormation() {   
    this.case = 'add';    
    this.formationService.addFormation(this.newFormation).subscribe((response)=>{
      this.message = "Cette information a été ajoutée avec succès!";
      console.log(response);
      $('#addFormation').modal("hide");
      this.dashboard.clear();
      this.getFormations();      
      this.cleanData();
    }, err => {
      console.log(err);
    });
  }

  editFormation = (formation: FormationResponse, index: number) => {
    this.newFormation = formation;
    this.index = index;
    this.case = 'update';
  }

  updateFormation() {
    this.formationService.updateFormation(this.newFormation).subscribe((response) => {
      this.message = "This Formation well be updated successfuly!";
      $('#addFormation').modal("hide");
      this.dashboard.clear();
      this.getFormations();
    }, err => {
      console.log(err);
    });
  }

  confirmDeleteFormation(formationId: number, i: number) {
    this.formationID = formationId;
    this.index = i;
  }

  deleteFormation(FormationID: number, index: number) {
    this.formationService.deleteFormation(FormationID).subscribe((response) => {
      this.message = "This Formation well be deleted successfuly!";
      this.formations.splice(index, 1);
      this.dashboard.clear();
      this.getFormations();
      $('#deleteFormation').modal("hide");
    }, err => {
      console.log(err);
    });
  }

  showPlan(formation: FormationResponse) {
    this.plans = formation.plan;
  }

  showColl(formationId: number) {
    this.formationService.getAllCollFromForm(formationId).subscribe((response) => {
      this.employes = response;
      this.formationID = formationId;
    }, (error) => {
      console.log(error);
    });
  }

  confirmDeleteEmploye(employeId: number, i: number) {
    this.employeID = employeId;
    this.index = i;
  }

  deleteEmplFromFormation(collId: number) {
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

  getColl() {
    this.collService.getColl().subscribe((response) => {
      this.dropdownListColl = response;
    }, (error) => {
      console.log(error);
    });
  }

  dropDownFormation = (formationId: number) => {

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
      let addById: AddById = new AddById();
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
      let addById: AddById = new AddById();
      addById.id1 = collId.id;
      addById.id2 = this.selectedItem;
      console.log(addById);
    }
  }
  
}
