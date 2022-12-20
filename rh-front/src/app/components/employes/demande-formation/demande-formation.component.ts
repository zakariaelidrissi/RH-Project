import { Component, OnInit, ViewChild } from '@angular/core';
import { AddById } from 'src/app/models/addById';
import { DemandeFormationRes } from 'src/app/models/demandeFormationRes';
import { FormationResponse } from 'src/app/models/formationResponse';
import { CollService } from 'src/app/services/collaborateur/coll.service';
import { FormationService } from 'src/app/services/formation/formation.service';
import { DashboardComponent } from '../../dashboard/dashboard.component';

declare const $: any;

@Component({
  selector: 'app-demande-formation',
  templateUrl: './demande-formation.component.html',
  styleUrls: ['./demande-formation.component.css']
})
export class DemandeFormationComponent implements OnInit {

  demandes : DemandeFormationRes[] = [];
  newDemande : AddById = new AddById();
  message : string = '';
  empId : number = 2;
  formations: FormationResponse[] = [];
  // case : string = 'old';

  @ViewChild(DashboardComponent) dashboard!:DashboardComponent;

  constructor(private formationService : FormationService,private collService : CollService) { }

  ngOnInit(): void {
    this.getDemandesFormation(this.empId);
    this.getCollFormations(this.empId);
  }

  getDemandesFormation(dmId : number){
    this.formationService.getDemandesByEmpId(dmId).subscribe((response) => {
      this.demandes = response;
      this.demandes.forEach(dm => {
        var dtDebut : Date = new Date(dm.formation.formationDate);
        var dtDm : Date = new Date(dm.demandeDate);
        // console.log(index);
        this.dashboard.setItems([dm.formation.name, dtDebut.toLocaleDateString(), dm.formation.duree, dtDm.toLocaleDateString(), dm.status]);
      });
    }, (error) => {
      console.log(error);
    });
  }

  addDemande(formationId : number, index : number) {
    this.newDemande.id1 = this.empId;
    this.newDemande.id2 = formationId;
    this.formationService.addDemande(this.newDemande).subscribe((response) => {
      this.message = 'Success!';
      this.formations.splice(index, 1);
      // this.getCollFormations(this.empId);
      this.getDemandesFormation(this.empId);
      // $('#newDemande').modal("hide");
    }, (error) => {
      console.log(error);
    });
  }

  getCollFormations(id : number) {
    this.collService.getCollaborateurByEmpId(id).subscribe((res) => {      
      this.formationService.getFormations().subscribe((response) => {
        // this.formations = response;
        response.forEach(form => {
          var k = 0;
          res.formations.forEach(f => {
            if (form.id === f.id) {
              k++;
            }
          });
          this.demandes.forEach(dm => {
            if (form.id === dm.formation.id) {
              k++;
            }
          });
          if (k === 0) {
            this.formations.push(form);
          }
        });
      }, (error) => {
        console.log(error);
      });
    }, (error) => {
      console.log(error);
    });
  }

}
