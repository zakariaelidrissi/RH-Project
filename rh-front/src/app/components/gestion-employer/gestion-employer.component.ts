import { Component, OnInit } from '@angular/core';
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

declare const $: any;

@Component({
  selector: 'app-gestion-employer',
  templateUrl: './gestion-employer.component.html',
  styleUrls: ['./gestion-employer.component.css']
})
export class GestionEmployerComponent implements OnInit {

  employes : Collaborateur[] = [];
  collRequest : CollRequest = new CollRequest();
  formations : FormationResponse[] = [];
  
  newEmploye : Employe = new Employe();

  message : string = '';
  index : number = 0;
  employeName : string = '';
  employeId : number = 0;
  case : string = 'add';

  dropdownListFormation : FormationResponse[] = [];
  selectedItems : any = [];
  selectedItem : number = 0;
  dropdownFormationSettings:IDropdownSettings = {};


  constructor(private employerService : GestionEmployeService, 
              private router: Router,
              private collService : CollService,
              private formationService : FormationService) { }

  ngOnInit(): void {    

    this.getAllEmployer();
  }

  getAllEmployer() : void{
    this.collService.getCollaborateur().subscribe((response: Collaborateur[]) => {
      this.employes = response;
    }, err => {
      console.log(err);
    });
  }

  onAdd() {
    this.case = 'add';
  }

  addEmploye(){    
    this.employerService.addEmploye(this.newEmploye).subscribe((response)=>{
      this.message = "This Employer well be added successfuly!";
      $('#addEmployer').modal("hide");

      this.employerService.getEmployeByCin(response.cin).subscribe((response) => {
        this.collRequest.employeId = response.id;
        
        this.collService.addCollaborateur(this.collRequest).subscribe((response) => {
          this.getAllEmployer();
          this.cleanData();
          this.router.navigate(['/gestion-employer']);
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

  editEmploye(empolye : Employe){
    this.newEmploye = empolye;
    this.case = 'update';
  }

  updateEmployes(){
    this.employerService.updateEmploye(this.newEmploye).subscribe((response)=>{
      this.message = "This Employer well be updated successfuly!";
      $('#addEmployer').modal("hide");
      this.cleanData();
      this.router.navigate(['/gestion-employer']);
    }, err => {
      console.log(err);
    });
  }

  confirmDeleteEmploye(employeID : number, i : number){
    this.employeId = employeID;
    this.index = i;    
  }

  deleteEmploye(employerID : number, index : number) {
    this.employerService.deleteEmploye(employerID).subscribe((response)=>{
      this.message = "This Employer well be deleted successfuly!";
      this.employes.splice(index, 1);
      this.collService.deleteCollaborateur(employerID).subscribe((response) => {
        $('#deleteEmploye').modal("hide");
        this.router.navigate(['/gestion-employer']);
      }, (error) => {
        console.log(error);
      });
    }, err => {
      console.log(err);
    })
  }

  showCollFormation(formations : FormationResponse[], employeId : number, employeName : string){    
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

  getFormation() : void {
    this.formationService.getFormations().subscribe((response : FormationResponse[]) => {
      this.dropdownListFormation = response;
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }

  add(collId : number) {
    this.selectedItem = collId;
  }

  dropDownFormation(collId : number, formation : FormationResponse[]){
    
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
      let addById : AddById = new AddById();
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

  cancelBtn1() {
    this.cleanData();
    this.getAllEmployer();
  }


}
