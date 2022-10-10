import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employer } from 'src/app/models/employer';
import { GestionEmployerService } from 'src/app/services/gestion-employer/gestion-employer.service';

declare const $: any;

@Component({
  selector: 'app-gestion-employer',
  templateUrl: './gestion-employer.component.html',
  styleUrls: ['./gestion-employer.component.css']
})
export class GestionEmployerComponent implements OnInit {

  employes : Employer[] = [];
  
  newEmployer : Employer = new Employer();
  updateEmployer : Employer = new Employer();

  message : string = '';
  deleteEmployeId : number = 0;
  index : number = 0;

  constructor(private employerService : GestionEmployerService, private router: Router) { }

  ngOnInit(): void {    

    this.getAllEmployer();
  }

  getAllEmployer() : void{
    this.employerService.getAllEmployer().subscribe((response: Employer[]) => {
      this.employes = response;
      console.log(this.employes);
    }, err => {
      console.log(err);
    });
  }

  addEmployer(){
    this.employerService.addEmployer(this.newEmployer).subscribe((Response)=>{
      this.message = "This Employer well be added successfuly!";
      $('#addEmployer').modal("hide");
      this.getAllEmployer();
    }, err => {
      console.log(err);
    });
  }

  editEmployer(empolyer : Employer){
    this.updateEmployer = empolyer;
  }

  updateEmployes(){
    this.employerService.updateEmployer(this.updateEmployer).subscribe((Response)=>{
      this.message = "This Employer well be updated successfuly!";
      $('#updateEmployer').modal("hide");
      this.router.navigate(['/gestion-employer']);
    }, err => {
      console.log(err);
    });
  }

  confirmDeleteFormation(employeID : number, i : number){
    this.deleteEmployeId = employeID;
    this.index = i;
    $('#deleteEmploye').modal("hide");
  }

  deleteEmployer(employerID : number, index : number) {
    this.employerService.deleteEmployer(employerID).subscribe((Response)=>{
      this.message = "This Employer well be deleted successfuly!";
      this.employes.splice(index, 1);
      this.router.navigate(['/gestion-employer']);
    }, err => {
      console.log(err);
    })
  }

}
