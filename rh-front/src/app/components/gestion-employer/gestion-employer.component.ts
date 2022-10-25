import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { Router } from '@angular/router';
import { CollRequest } from 'src/app/models/collRequest';
import { Employe } from 'src/app/models/employe';
import { FormationResponse } from 'src/app/models/formationResponse';
import { CollService } from 'src/app/services/collaborateur/coll.service';
import { GestionEmployeService } from 'src/app/services/gestion-employe/gestion-employe.service';

declare const $: any;

@Component({
  selector: 'app-gestion-employer',
  templateUrl: './gestion-employer.component.html',
  styleUrls: ['./gestion-employer.component.css']
})
export class GestionEmployerComponent implements OnInit, AfterContentChecked {

  employes : Employe[] = [];
  collRequest : CollRequest = new CollRequest();
  formations : FormationResponse[] = [];
  
  newEmploye : Employe = new Employe();
  updateEmploye : Employe = new Employe();

  message : string = '';
  deleteEmployeId : number = 0;
  index : number = 0;
  employeName : string = '';

  constructor(private employerService : GestionEmployeService, 
              private router: Router,
              private collService : CollService) { }

  ngOnInit(): void {    

    this.getAllEmployer();
  }

  ngAfterContentChecked(): void {
    this.getAllEmployer();
  }

  getAllEmployer() : void{
    this.employerService.getAllEmploye().subscribe((response: Employe[]) => {
      this.employes = response;
      console.log(response);
    }, err => {
      console.log(err);
    });
  }

  addEmploye(){
    this.employerService.addEmploye(this.newEmploye).subscribe((response)=>{
      this.message = "This Employer well be added successfuly!";
      $('#addEmployer').modal("hide");

      this.employerService.getEmployeByCin(response.cin).subscribe((response) => {
        this.collRequest.employeId = response.id;

        this.collService.addCollaborateur(this.collRequest).subscribe((response) => {
          // this.router.navigate(['/gestion-employer']);
          // this.getAllEmployer();
          this.newEmploye = new Employe();
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
    this.updateEmploye = empolye;
  }

  updateEmployes(){
    this.employerService.updateEmploye(this.updateEmploye).subscribe((response)=>{
      this.message = "This Employer well be updated successfuly!";
      $('#updateEmployer').modal("hide");
      this.router.navigate(['/gestion-employer']);
    }, err => {
      console.log(err);
    });
  }

  confirmDeleteEmploye(employeID : number, i : number){
    this.deleteEmployeId = employeID;
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

  showCollFormation(employeId : number, employeName : string){
    this.collService.getCollById(employeId).subscribe((response) => {
      this.formations = response.formations;
      this.employeName = employeName;
    }, (error) => {
      console.log(error);
    });
  }

}
