import { Component, OnInit, ViewChild } from '@angular/core';
import { AddById } from 'src/app/models/addById';
import { DemandeFormationReq } from 'src/app/models/demandeFormationReq';
import { DemandeFormationRes } from 'src/app/models/demandeFormationRes';
import { FormationService } from 'src/app/services/formation/formation.service';
import { DashboardComponent } from '../dashboard/dashboard.component';

declare const $: any;

@Component({
  selector: 'app-demande-formations',
  templateUrl: './demande-formations.component.html',
  styleUrls: ['./demande-formations.component.css']
})
export class DemandeFormationsComponent implements OnInit {

  demandes : DemandeFormationRes[] = [];
  updDemande : DemandeFormationReq = new DemandeFormationReq();
  message : string = '';
  demandeId : number = 0;
  collID : number = 0;
  formID : number = 0;
  addCollToForm : AddById = new AddById();
  case : string = '';
  
  @ViewChild(DashboardComponent) dashboard!:DashboardComponent;
  
  constructor(private formationService : FormationService) { }

  ngOnInit(): void {
    this.getAllDemandes();
  }

  actions(demandeId : number, index: number, collid : number, formid : number) {
    return '<div id_='+demandeId+' collId_='+collid+' formId_='+formid+' index_='+index+' class="me-auto d-flex">'+
              '<button type_="accept" class="btn btn-success me-2 btn-sm"'+
              'data-bs-toggle="modal" data-bs-target="#demandeModal">'+
              '<i class="bi bi-pencil-square"></i>'+
              ' </button>'+
              '<button  type_="refuse" class="btn btn-danger me-2 btn-sm"'+
                  'data-bs-toggle="modal" data-bs-target="#demandeModal">'+
                  '<i class="bi bi-trash3-fill"></i>'+
              '</button>'+
            '</div>';
  }

  handleButons = (button: any) => {
    const type = button.getAttribute("type_");
    const id_ = button.parentNode.getAttribute("id_");
    const index_ = button.parentNode.getAttribute("index_");
    const collId = button.parentNode.getAttribute("collId_");
    const formId = button.parentNode.getAttribute("formId_");

    if(type === "accept"){
      this.conferme(id_, type, collId, formId);
    } else if (type === "refuse") {
      this.conferme(id_, type, collId, formId);
    }
  }

  getAllDemandes() {
    this.formationService.getAllDemandes().subscribe((res) => {
      this.demandes = res;
      const handleButons = this.handleButons;
      this.demandes.forEach((dm, index) => {
        var dtDebut: Date = new Date(dm.formation.formationDate);
        var dtDemande: Date = new Date(dm.demandeDate);
        var act : string = '';
        if (dm.status === "encore..."){
          act = this.actions(dm.id, index, dm.collaborateur.id, dm.formation.id);
        }
        else act = ' - ';
        this.dashboard.setItems([dm.formation.name, dtDebut.toLocaleDateString(), dm.formation.duree, dtDemande.toLocaleDateString(), dm.status, act]);
      });
      $('#example tbody').on('click', 'button', function (this: any, event: any) {
        handleButons(this);
      });
    }, (error) => {
      console.log(error);
    });
  }

  conferme(id : number, type : string, collId : number, formId : number) {
    if (type === "accept") {
      this.case = "accept";
    }
    else if (type === "refuse") {
      this.case = "refuse"
    }
    this.demandeId = id;
    this.addCollToForm.id1 = collId;
    this.addCollToForm.id2 = formId;
    console.log(this.addCollToForm.id1);
    console.log(this.addCollToForm.id2);
  }

  accept(demandeId : number) {
    this.updDemande.id = demandeId;
    this.updDemande.status = 'accept';
    // this.addCollToForm.id1 = this.collID;
    // this.addCollToForm.id2 = this.formID;
    this.formationService.updateDemande(this.updDemande).subscribe((res) => {
      this.formationService.addCollToFormation(this.addCollToForm).subscribe((res) => {
        this.message = 'Successfuly!';
        $('#demandeModal').modal('hide');
      }, (error) => {
        console.log(error);
      });
    }, (error) => {
      console.log(error);
    });
  }

  refuse(demandeId : number) {
    this.updDemande.id = demandeId;
    this.updDemande.status = 'refuse';
    this.formationService.updateDemande(this.updDemande).subscribe((res) => {
      this.message = 'Success!';
      $('#demandeModal').modal('hide');
    }, (error) => {
      console.log(error);
    });
  }

}
