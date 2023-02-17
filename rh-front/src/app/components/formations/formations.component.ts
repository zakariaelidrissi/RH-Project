import { Component, OnInit, ViewChild } from '@angular/core';
import { FormationRequest } from 'src/app/models/formationRequest';
import { FormationResponse } from 'src/app/models/formationResponse';
import { PlanResponse } from 'src/app/models/planResponse';
import { FormationService } from 'src/app/services/formation/formation.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AddById } from 'src/app/models/addById';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { formatDate } from '@angular/common';
import { Employe } from 'src/app/models/employe';
import { GestionEmployeService } from 'src/app/services/gestion-employe/gestion-employe.service';

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
  employes: Employe[] = [];  
  index: number = 0;
  formationID: number = 0;
  empFormId: number = 0;
  case: string = 'add';

  message: string = '';

  dropdownListEmp: any = [];
  selectedItems: any = [];
  selectedItem: number = 0;
  dropdownEmpSettings: IDropdownSettings = {};
  errors: any[] = [];

  @ViewChild(DashboardComponent) dashboard!: DashboardComponent;

  constructor(private formationService: FormationService,
    private gestionEmployeService: GestionEmployeService) { }

  ngOnInit(): void {

    this.getFormations();
    // this.addFormation();
  }

  actions(formationId: number, index: number) {
    return '<div id_=' + formationId + ' index_=' + index + ' class="me-auto d-flex">' +
      '<button  type_="dropDown" class="btn btn-primary me-2 btn-sm" title="Ajouter un employe à cette formation"' +
      'data-bs-toggle="modal" data-bs-target="#addEmpToFormation">' +
      '<i class="bi bi-plus-circle-fill"></i>' +
      '</button>' +
      '<button type_="editFormation" class="btn btn-warning me-2 btn-sm" title="modifier les informations de cette formation"' +
      'data-bs-toggle="modal" data-bs-target="#addFormation">' +
      '<i class="bi bi-pencil-square"></i>' +
      ' </button>' +
      '<button type_="showPlan" class="btn btn-success me-2 btn-sm" title="afficher les plan lies à cette formation"' +
      '   data-bs-toggle="modal" data-bs-target="#showPlan">' +
      '<i class="bi bi-eye-fill"></i>' +
      '</button>' +
      '<button type_="showEmployes" class="btn btn-primary me-2 btn-sm" title="afficher les employes associer à cette formation"' +
      ' data-bs-toggle="modal" data-bs-target="#showEmployes">' +
      '<i class="bi bi-eyeglasses"></i>' +
      '</button>' +
      '<button type_="confirmDeleteFormation" class="btn btn-danger btn-sm" title="supprimer cette formation"' +
      ' data-bs-toggle="modal" data-bs-target="#deleteFormation">' +
      '<i class="bi bi-trash3-fill"></i>' +
      '</button>' +
      '</div>';
  }

  getFormations(): void {
    this.formationService.getFormations().subscribe((response: FormationResponse[]) => {
      this.formations = response;
      const handleButons = this.handleButons;
      this.formations.forEach((form, index) => {
        var dt: Date = new Date(form.formationDate);
        var obj = form.objectif.slice(0,20)+'...';
        this.dashboard.setItems([form.name, dt.toLocaleDateString(), form.duree, obj, this.actions(form.id, index)]);
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

    if (type === "dropDown") {
      this.dropDownFormation(id_);
    } else if (type === "editFormation") {
      this.editFormation(this.formations.find(f => f.id == id_) as FormationResponse, index_);
    } else if (type === "showPlan") {
      this.showPlan(id_);
    } else if (type === "showEmployes") {
      this.showEmployes(id_);
    } else if (type === "confirmDeleteFormation") {
      this.confirmDeleteFormation(id_, index_);
    }
  }

  onAdd() {
    this.case = 'add';
    this.cleanData();
  }

  formatDate = function (date: Date) {
    var dateOut = new Date(date);
    return dateOut;
  };

  confirm(cas : string) {
    this.errors = [];
    if (this.newFormation.name == ''){
      this.errors.push({key:'name', value:"le nom est obligatoire!"});
    }

    if (this.newFormation.duree == ''){
      this.errors.push({key:'duree', value:"la duree est obligatoire!"});
    }else if (this.newFormation.duree <= '0'){
      this.errors.push({key:'duree', value:"la duree doit au moins superieur ou egale 1 jours"});
    }

    if (this.newFormation.objectif == ''){
      this.errors.push({key:'objectif', value:"l'objectif est obligatoire!"});
    }else if (this.newFormation.objectif.length < 10){
      this.errors.push({key:'objectif', value:"l'objectif doit au moins contenir 10 caractères"});
    }

    if (formatDate(this.newFormation.formationDate, 'yyyy/MM/dd', 'en') < formatDate(new Date(), 'yyyy/MM/dd', 'en')) {
      if (cas === 'add'){
        this.errors.push({key:'date', value:"la date doit superieur ou egale à la date d'aujourd'hui!"});
      }
    }

    if (!this.newFormation.name && !this.newFormation.duree && !this.newFormation.formationDate && !this.newFormation.objectif) {
      this.errors.push({key:'full', value:"tout les champs est obligatoire!"});      
    }
    
    if (this.errors.length == 0){
      if (cas == 'add') this.saveFormation();
      if (cas == 'update') this.updateFormation();
    }
  }

  saveFormation() {
    this.case = 'add';
    this.formationService.addFormation(this.newFormation).subscribe((response) => {
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
    this.errors = [];
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

  showPlan(formationId : number) {
    this.formationService.getAllPlanFromForm(formationId).subscribe((res) => {
      this.plans = res;
      console.log(this.plans);
    }, (error) => {
      console.log(error);
    });
  }

  showEmployes(formationId: number) {
    this.formationService.getEmployesByFormationId(formationId).subscribe((response) => {
      this.employes = response;
      this.formationID = formationId;
    }, (error) => {
      console.log(error);
    });
  }

  confirmDeleteEmploye(i: number) {
    this.index = i;
  }

  deleteEmpFromFormation() {
    this.formationService.deleteEmpFromFormation(this.formationID).subscribe((response) => {
      this.message = "Successfuly!";
      this.employes.splice(this.index, 1);
      $('#deleteEmplFromForm').modal("hide");
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

  getEmployes(formationId : number) {
    this.dropdownListEmp = [];
    this.gestionEmployeService.getAllEmploye().subscribe((response) => {
      this.formationService.getEmployesByFormationId(formationId).subscribe((res) => {
        this.dropdownListEmp = response;
        response.forEach((re, index) => {
          var k = 0;
          for (var r of res){
            if (re.id == r.id) {k++; break;};
          }
          if ( k > 0) {
            this.dropdownListEmp.splice(index, 1);
          }
        });
      });
    }, (error) => {
      console.log(error);
    });
  }

  dropDownFormation (formationId: number) {

    this.getEmployes(formationId);
    this.selectedItem = formationId;    

    this.selectedItems = [];

    this.dropdownEmpSettings = {
      singleSelection: false,
      idField: 'id',
      textField: "name",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
  }

  addEmpToFormaton() {
    for (let index = -1; index < this.selectedItems.length; index++) {
      if (index != -1) {
        const collId = this.selectedItems[index];
        let addById: AddById = new AddById();
        addById.id1 = collId.id;
        addById.id2 = this.selectedItem;
        this.formationService.addEmpToFormation(addById).subscribe((response) => {
          this.message = "Successfuly!";
          $('#addEmpToFormation').modal("hide");
        }, (error) => {
          console.log(error);
        });
      }
    }
  }

}
