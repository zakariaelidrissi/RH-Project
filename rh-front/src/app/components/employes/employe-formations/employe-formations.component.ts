import { Component, OnInit, ViewChild } from '@angular/core';
import { Collaborateur } from 'src/app/models/collaborateur';
import { FormationResponse } from 'src/app/models/formationResponse';
import { CollService } from 'src/app/services/collaborateur/coll.service';
import { DashboardComponent } from '../../dashboard/dashboard.component';

declare const $: any;

@Component({
  selector: 'app-employe-formations',
  templateUrl: './employe-formations.component.html',
  styleUrls: ['./employe-formations.component.css']
})
export class EmployeFormationsComponent implements OnInit {

  formations : FormationResponse[] = [];

  @ViewChild(DashboardComponent) dashboard!:DashboardComponent;

  constructor(private collService : CollService) { }

  ngOnInit(): void {
  }

  getAllFormation(id : number){
    this.collService.getCollaborateurByEmpId(id).subscribe((response) => {
      this.formations = response.formations;
      // const handleButons = this.handleButons;
      this.formations.forEach(form => {
        var dt : Date = new Date(form.formationDate);
        // console.log(index);
        this.dashboard.setItems([form.name, dt.toLocaleDateString(), form.duree, form.objectif]);
      });
      // $('#example tbody').on('click', 'button', function (this:any,event:any) {
      //   handleButons(this);
      // } );
    }, (error) => {
      console.log(error);
    });
  }



}
