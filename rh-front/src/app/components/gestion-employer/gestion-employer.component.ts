import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Collaborateur } from 'src/app/models/collaborateur';
import { CollRequest } from 'src/app/models/collRequest';
import { Employe } from 'src/app/models/employe';
import { FormationResponse } from 'src/app/models/formationResponse';
import { CollService } from 'src/app/services/collaborateur/coll.service';
import { GestionEmployeService } from 'src/app/services/gestion-employe/gestion-employe.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormationService } from 'src/app/services/formation/formation.service';
import { AddById } from 'src/app/models/addById';
import { DashboardComponent } from '../dashboard/dashboard.component';

declare const $: any;

@Component({
  selector: 'app-gestion-employer',
  templateUrl: './gestion-employer.component.html',
  styleUrls: ['./gestion-employer.component.css']
})
export class GestionEmployerComponent implements OnInit {

  employes: Collaborateur[] = [];
  collRequest: CollRequest = new CollRequest();
  formations: FormationResponse[] = [];

  newEmploye: Employe = new Employe();

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
    private collService: CollService,
    private formationService: FormationService) { }

  ngOnInit(): void {

    this.getAllEmployer();
  }

  actions(collId : number, index: number) {
    return '<div id_='+collId+' index_='+index+' class="me-auto d-flex">'+
            '<button type_="editEmploye" class="btn btn-warning me-2 btn-sm" (click)="editEmploye(coll.employe)"'+
                'data-bs-toggle="modal" data-bs-target="#addEmploye">'+
                '<i class="bi bi-pencil-square"></i>'+
            '</button>'+
            '<button type_="dropDownFormation" class="btn btn-primary me-2 btn-sm" (click)="dropDownFormation(coll.id, coll.formations)" '+
                'data-bs-target="#addCollToFormation" data-bs-toggle="modal">'+
                '<i class="bi bi-plus-circle-fill"></i>'+
            '</button>'+
            '<button type_="showCollFormation" class="btn btn-success me-2 btn-sm" (click)="showCollFormation(coll.formations, coll.empolyeID, coll.employe.nom)"'+
                'data-bs-toggle="modal" data-bs-target="#showCollFormation">'+
                '<i class="bi bi-eye-fill"></i>'+
            '</button>'+
            '<button type_="confirmDeleteEmploye" class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteEmploye"'+
                '(click)="confirmDeleteEmploye(coll.empolyeID, i)">'+
                '<i class="bi bi-trash3-fill"></i>'+
            '</button>'+
        '</div>';
  }

  getAllEmployer() : void{
    this.collService.getCollaborateur().subscribe((response: Collaborateur[]) => {
      this.employes = response;
      const handleButons = this.handleButons;
      this.employes.forEach((coll, index) => {
        var dtBirth: Date = new Date(coll.employe.naissance);
        var dtemb: Date = new Date(coll.employe.debutAmbauche);
        this.dashboard.setItems([coll.employe.nom, coll.employe.cin, coll.employe.email,
        dtBirth.toLocaleDateString(), dtemb.toLocaleDateString(), coll.employe.departement, coll.employe.poste, this.actions(coll.id, index)]);
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
    if (type === "editEmploye") {
      this.editEmploye(this.employes.find(f => f.id == id_)?.employe as Employe);
    } else if (type === "dropDownFormation") {
      this.dropDownFormation(id_, this.employes.find(f => f.id == id_)!.formations);
    } else if (type === "showCollFormation") {
      this.showCollFormation(this.employes.find(f => f.id == id_)!.formations,
        this.employes.find(f => f.id == id_)!.empolyeID, this.employes.find(f => f.id == id_)!.employe.nom);
    } else if (type === "confirmDeleteEmploye") {
      this.confirmDeleteEmploye(this.employes.find(f => f.id == id_)!.empolyeID, index_);
    }
  }

  onAdd() {
    this.case = 'add';
    this.cleanData();
  }

  addEmploye() {
    this.employerService.addEmploye(this.newEmploye).subscribe((response) => {
      this.message = "This Employer well be added successfuly!";
      $('#addEmployer').modal("hide");

      this.employerService.getEmployeByCin(response.cin).subscribe((response) => {
        this.collRequest.employeId = response.id;

        this.collService.addCollaborateur(this.collRequest).subscribe((response) => {
          this.dashboard.clear();
          this.getAllEmployer();
          this.cleanData();
          // this.router.navigate(['/gestion-employer']);
        }, (error) => {
          console.log(error);
        });

      }, (error) => {
        console.log(error);
      });

    }, err => {
      console.log(err);
    });
  }

  editEmploye(empolye: Employe) {
    this.newEmploye = empolye;
    this.case = 'update';
  }

  updateEmployes() {
    this.employerService.updateEmploye(this.newEmploye).subscribe((response) => {
      this.message = "This Employer well be updated successfuly!";
      $('#addEmployer').modal("hide");
      this.dashboard.clear();
      this.getAllEmployer();
      // this.router.navigate(['/gestion-employer']);
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
      this.collService.deleteCollaborateur(employerID).subscribe((response) => {
        $('#deleteEmploye').modal("hide");
        this.dashboard.clear();
        this.getAllEmployer();
        // this.router.navigate(['/gestion-employer']);
      }, (error) => {
        console.log(error);
      });
    }, err => {
      console.log(err);
    })
  }

  showCollFormation(formations: FormationResponse[], employeId: number, employeName: string) {
    this.formations = formations;
    this.employeId = employeId;
    this.employeName = employeName;
  }

  cleanData() {
    this.newEmploye.cin = '';
    this.newEmploye.debutAmbauche = new Date();
    this.newEmploye.departement = '';
    this.newEmploye.email = '';
    this.newEmploye.naissance = new Date();
    this.newEmploye.nom = '';
    this.newEmploye.poste = '';
  }

  getFormation(): void {
    this.formationService.getFormations().subscribe((response: FormationResponse[]) => {
      this.dropdownListFormation = response;
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }

  add(collId: number) {
    this.selectedItem = collId;
  }

  dropDownFormation(collId: number, formation: FormationResponse[]) {

    this.getFormation();
    this.selectedItem = collId;

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

  addCollToFormaton() {
    for (let index = 0; index < this.selectedItems.length; index++) {
      const formationID = this.selectedItems[index];
      let addById: AddById = new AddById();
      addById.id1 = this.selectedItem;
      addById.id2 = formationID.id;
      this.formationService.addCollToFormation(addById).subscribe((response) => {
        this.message = "Successfuly!";
        $('#addCollToFormation').modal("hide");
      }, (error) => {
        console.log(error);
      });
    }
  }

}
