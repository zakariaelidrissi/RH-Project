import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employe } from 'src/app/models/employe';
import { GestionEmployeService } from 'src/app/services/gestion-employe/gestion-employe.service';

declare const $: any;

@Component({
  selector: 'app-gestion-employer',
  templateUrl: './gestion-employer.component.html',
  styleUrls: ['./gestion-employer.component.css']
})
export class GestionEmployerComponent implements OnInit {

  employes : Employe[] = [];
  
  newEmploye : Employe = new Employe();
  updateEmploye : Employe = new Employe();

  message : string = '';
  deleteEmployeId : number = 0;
  index : number = 0;

  constructor(private employerService : GestionEmployeService, private router: Router) { }

  ngOnInit(): void {    

    this.getAllEmployer();
  }

  getAllEmployer() : void{
    this.employerService.getAllEmploye().subscribe((response: Employe[]) => {
      this.employes = response;
      console.log(this.employes);
    }, err => {
      console.log(err);
    });
  }

  addEmploye(){
    this.employerService.addEmploye(this.newEmploye).subscribe((Response)=>{
      this.message = "This Employer well be added successfuly!";
      $('#addEmployer').modal("hide");
      this.getAllEmployer();
    }, err => {
      console.log(err);
    });
  }

  editEmploye(empolye : Employe){
    this.updateEmploye = empolye;
  }

  updateEmployes(){
    this.employerService.updateEmploye(this.updateEmploye).subscribe((Response)=>{
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
    $('#deleteEmploye').modal("hide");
  }

  deleteEmploye(employerID : number, index : number) {
    this.employerService.deleteEmploye(employerID).subscribe((Response)=>{
      this.message = "This Employer well be deleted successfuly!";
      this.employes.splice(index, 1);
      this.router.navigate(['/gestion-employer']);
    }, err => {
      console.log(err);
    })
  }

}
