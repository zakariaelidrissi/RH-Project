import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Formation } from 'src/app/models/formation';
import { FormationService } from 'src/app/services/formation/formation.service';

declare const $: any;

@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.css']
})
export class FormationsComponent implements OnInit {
  
  formations : Formation[] = [];
  newFormation : Formation = new Formation();
  updFormation : Formation = new Formation();
  deleteFormationId : number = 0;
  index : number = 0;

  message : string = '';
  dr : string = 'Day(s)';

  constructor(private formationService: FormationService, private router: Router) { }

  ngOnInit(): void {    

    this.getFormations();
  }

  getFormations(): void {
    this.formationService.getFormations().subscribe((response: Formation[]) => {
      this.formations = response;
      console.log(response);
    }, err => {
      console.log(err);
    });
  }

  saveFormation() {
    this.newFormation.duree += ' ' + this.dr;
    console.log(this.newFormation);      
    this.formationService.addFormation(this.newFormation).subscribe((Response)=>{
      this.message = "This Formation well be added successfuly!";
      console.log(Response);
      $('#addFormation').modal("hide");
      this.router.navigate(['/formations']);
    }, err => {
      console.log(err);
    });    
  }

  editFormation(formation : Formation){
    this.updFormation = formation;
  }  

  updateFormation() {
    this.formationService.updateFormation(this.updFormation).subscribe((Response)=>{
      this.message = "This Formation well be updated successfuly!";
      $('#updateFormation').modal("hide");
      this.router.navigate(['/formations']);
    }, err => {
      console.log(err);
    });
  }

  confirmDeleteFormation(formationID : number, i : number){
    this.deleteFormationId = formationID;
    this.index = i;
    $('#deleteFormation').modal("hide");
  }

  deleteFormation(FormationID : number, index : number) {
    this.formationService.deleteFormation(FormationID).subscribe((Response)=>{
      this.message = "This Formation well be deleted successfuly!";
      this.formations.splice(index, 1);
      this.router.navigate(['/formations']);
    }, err => {
      console.log(err);
    })
  }

}
