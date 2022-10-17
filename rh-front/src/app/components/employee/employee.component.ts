import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormationResponse } from 'src/app/models/formationResponse';
import { CollService } from 'src/app/services/collaborateur/coll.service';
import { FormationService } from 'src/app/services/formation/formation.service';

@Component({
  selector: 'app-employe',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, AfterContentChecked {

  formations : FormationResponse[] = [];
  message : string = '';

  constructor(private formationService : FormationService,
              private collService : CollService) { }

  ngOnInit(): void {
  }

  ngAfterContentChecked(): void {
    
  }

  getFormations(empId : number) {
    this.collService.getCollById(empId).subscribe((response) => {
      this.formations = response.formations;
    }, (error) => {
      console.log(error);
    })
  }

}
