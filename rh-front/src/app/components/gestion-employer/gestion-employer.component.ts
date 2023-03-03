import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CollRequest } from 'src/app/models/collRequest';
import { Employe } from 'src/app/models/employe';
import { FormationResponse } from 'src/app/models/formationResponse';
import { GestionEmployeService } from 'src/app/services/gestion-employe/gestion-employe.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormationService } from 'src/app/services/formation/formation.service';
import { AddById } from 'src/app/models/addById';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Departement } from 'src/app/models/enums/departement';
import { Poste } from 'src/app/models/enums/poste';
import { AddEmployeRequest } from 'src/app/models/addEmployeRequest';
import { Etablissement } from 'src/app/models/enums/etablissement';

declare const $: any;

@Component({
  selector: 'app-gestion-employer',
  templateUrl: './gestion-employer.component.html',
  styleUrls: ['./gestion-employer.component.css']
})
export class GestionEmployerComponent implements OnInit {

  etablissementTypes = Object.values(Etablissement);
  posteTypes = Object.values(Poste);
  departementTypes = Object.values(Departement);


  employes: Employe[] = [];
  collRequest: CollRequest = new CollRequest();
  formations: FormationResponse[] = [];

  newEmploye: AddEmployeRequest = new AddEmployeRequest();

  message: string = '';
  index: number = 0;
  employeName: string = '';
  employeId: number = 0;
  case: string = 'add';

  dropdownListFormation: FormationResponse[] = [];
  selectedItems: any = [];
  selectedItem: number = 0;
  dropdownFormationSettings: IDropdownSettings = {};

  @ViewChild(DashboardComponent) dashboard!: DashboardComponent;


  constructor(private employerService: GestionEmployeService,
    private router: Router,
    private formationService: FormationService) { }

  ngOnInit(): void {    
    this.getAllEmployer();
  }

  actions(empId: number, index: number) {
    return '<div id_=' + empId + ' index_=' + index + ' class="me-auto d-flex">' +
      '<button type_="editEmploye" class="btn btn-warning me-2 btn-sm"' +
        'data-bs-toggle="modal" data-bs-target="#addEmploye">' +
        '<i class="bi bi-pencil-square"></i>' +
      '</button>' +
      '<button type_="dropDownFormation" class="btn btn-primary me-2 btn-sm"' +
        'data-bs-target="#addEmpToFormation" data-bs-toggle="modal">' +
        '<i class="bi bi-plus-circle-fill"></i>' +
      '</button>' +
      '<button type_="showEmpFormation" class="btn btn-success me-2 btn-sm"' +
        'data-bs-toggle="modal" data-bs-target="#showEmpFormation">' +
        '<i class="bi bi-eye-fill"></i>' +
      '</button>' +
      '<button type_="confirmDeleteEmploye" class="btn btn-danger btn-sm" data-bs-toggle="modal"'+
        'data-bs-target="#deleteEmploye"> <i class="bi bi-trash3-fill"></i>' +
      '</button>' +
      '</div>';
  }

  getAllEmployer(): void {
    this.employerService.getAllEmploye().subscribe((response) => {
      this.employes = response;
      console.log("emp", this.employes);
      const handleButons = this.handleButons;
      this.employes.forEach((employe, index) => {
        var dtBirth: Date = new Date(employe.user.dateNaissance);
        var dtemb: Date = new Date(employe.debutAmbauche);
        var userName = employe.user.nom + employe.user.prenom;
        this.dashboard.setItems([userName, employe.user.cin, employe.user.email,
          dtBirth.toLocaleDateString(), dtemb.toLocaleDateString(), employe.departement, employe.poste, this.actions(employe.id, index)]);
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
    if (type === "editEmploye") {
      this.editEmploye(this.employes.find(f => f.id == id_) as Employe);
    } else if (type === "dropDownFormation") {
      const employeId = this.employes.find(f => f.id == id_)?.id as number;
      console.log(employeId);
      this.dropDownFormation(employeId);
    } else if (type === "showEmpFormation") {
      const employeId = this.employes.find(f => f.id == id_)?.id as number;
      this.formationService.getFormationsByEmployeId(employeId).subscribe((response) => {
        this.showEmpFormation(
          response,
          this.employes.find(f => f.id == id_)!.id,
          this.employes.find(f => f.id == id_)!.user.nom
        );
      });
    } else if (type === "confirmDeleteEmploye") {
      this.confirmDeleteEmploye(this.employes.find(f => f.id == id_)!.id, index_);
    }
  }

  onAdd() {
    this.case = 'add';
    this.cleanData();
  }

  addEmploye() {
    this.employerService.addEmploye(this.newEmploye).subscribe((response) => {
      this.message = "This Employer well be added successfuly!";      
        this.dashboard.clear();
        this.getAllEmployer();
        this.cleanData();
        $('#addEmploye').modal("hide");
    }, err => {
      console.log(err);
    });
  }

  editEmploye(employe: Employe) {
    this.newEmploye.cin = employe.user.cin;
    this.newEmploye.email = employe.user.email;
    this.newEmploye.debutAmbauche = employe.debutAmbauche;
    this.newEmploye.departement = employe.departement;
    this.newEmploye.etablissement = employe.etablissement;
    this.newEmploye.poste = employe.poste;
    this.newEmploye.genre = employe.user.genre;
    this.newEmploye.naissance = employe.user.dateNaissance;
    this.newEmploye.nom = employe.user.nom;
    this.newEmploye.prenom = employe.user.prenom;
    this.newEmploye.tel = employe.user.tel;
    this.case = 'update';
  }

  updateEmployes() {
    this.employerService.updateEmploye(this.newEmploye).subscribe((response) => {
      this.message = "This Employer well be updated successfuly!";
      this.dashboard.clear();
      this.getAllEmployer();
      $('#addEmployer').modal("hide");
    }, err => {
      console.log(err);
    });
  }

  confirmDeleteEmploye(employeID: number, i: number) {
    this.employeId = employeID;
    this.index = i;
  }

  deleteEmploye(employerID: number, index: number) {
    this.employerService.deleteEmploye(employerID).subscribe((response) => {
      this.message = "This Employer well be deleted successfuly!";
      this.employes.splice(index, 1);
      $('#deleteEmploye').modal("hide");
      this.dashboard.clear();
      this.getAllEmployer();
    }, err => {
      console.log(err);
    })
  }

  showEmpFormation(formations: FormationResponse[], employeId: number, employeName: string) {
    this.formations = formations;
    this.employeId = employeId;
    this.employeName = employeName;
  }

  cleanData() {
    this.newEmploye.cin = '';
    this.newEmploye.debutAmbauche = new Date();
    this.newEmploye.departement = Departement.Informatique;
    this.newEmploye.email = '';
    this.newEmploye.naissance = new Date();
    this.newEmploye.nom = '';
    this.newEmploye.etablissement = Etablissement.Fs;
    this.newEmploye.poste = Poste.Doyen;
    this.newEmploye.genre = 'Homme';
    this.newEmploye.prenom = '';
    this.newEmploye.tel = '';
  }

  getFormation(empId : number): void {
    this.dropdownListFormation = [];
    this.formationService.getFormations().subscribe((response: FormationResponse[]) => {
      this.formationService.getFormationsByEmployeId(empId).subscribe((res) => {
        this.formationService.getDemandesByEmpId(empId).subscribe((r) => {
          this.dropdownListFormation = response;
          response.forEach((form, index) => {
            var k = 0;
            for (var f of res) {
              if (form.id === f.id) {k++; break;}
            }
            for (var dm of r) {
              if (form.id === dm.id) {k++; break;}
            }
            if (k > 0) this.dropdownListFormation.splice(index, 1);
          });
        });
      });
    }, (error) => {
      console.log(error);
    });
  }

  add(collId: number) {
    this.selectedItem = collId;
  }

  dropDownFormation(empId: number) {

    this.getFormation(empId);
    this.selectedItem = empId;

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

  addEmpToFormation() {
    for (let index = 0; index < this.selectedItems.length; index++) {
      const formationID = this.selectedItems[index];
      let addById: AddById = new AddById();
      addById.id1 = this.selectedItem;
      addById.id2 = formationID.id;
      this.formationService.addEmpToFormation(addById).subscribe((response) => {
        this.message = "Successfuly!";
        $('#addEmpToFormation').modal("hide");
      }, (error) => {
        console.log(error);
      });
    }
  }

}
