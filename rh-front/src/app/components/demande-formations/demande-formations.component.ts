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

  demandes: DemandeFormationRes[] = [];
  updDemande: DemandeFormationReq = new DemandeFormationReq();
  message: string = '';
  demandeId: number = 0;
  empID: number = 0;
  formID: number = 0;
  addEmpToForm: AddById = new AddById();
  case: string = '';

  @ViewChild(DashboardComponent) dashboard!: DashboardComponent;

  constructor(private formationService: FormationService) { }

  ngOnInit(): void {
    this.getAllDemandes();
  }

  actions(demandeId: number, index: number, empid: number, formid: number) {
    return '<div id_=' + demandeId + ' empId_=' + empid + ' formId_=' + formid + ' index_=' + index + ' class="me-auto d-flex">' +
      '<button type_="accept" class="btn btn-success me-2 btn-sm"' +
      'data-bs-toggle="modal" data-bs-target="#demandeModal">' +
      '<i class="bi bi-check"></i>' +
      ' </button>' +
      '<button  type_="refuse" class="btn btn-danger me-2 btn-sm"' +
      'data-bs-toggle="modal" data-bs-target="#demandeModal">' +
      '<i class="bi bi-trash3-fill"></i>' +
      '</button>' +
      '</div>';
  }

  handleButons = (button: any) => {
    const type = button.getAttribute("type_");
    const id_ = button.parentNode.getAttribute("id_");
    const index_ = button.parentNode.getAttribute("index_");
    const empId = button.parentNode.getAttribute("empId_");
    const formId = button.parentNode.getAttribute("formId_");

    if (type === "accept") {
      this.conferme(id_, type, empId, formId);
    } else if (type === "refuse") {
      this.conferme(id_, type, empId, formId);
    }
  }

  getAllDemandes() {
    this.formationService.getAllDemandes().subscribe((res) => {
      this.demandes = res;
      const handleButons = this.handleButons;
      this.demandes.forEach((dm, index) => {
        var dtDebut: Date = new Date(dm.formation.formationDate);
        var dtDemande: Date = new Date(dm.dateDemande);
        var act: string = '';
        var name = dm.employe.user.nom + ' ' + dm.employe.user.prenom;
        if (dm.status === "Waiting") {
          act = this.actions(dm.id, index, dm.employeId, dm.formationId);
        }
        else act = ' --- ';
        this.dashboard.setItems([name ,dm.formation.name, dtDebut.toLocaleDateString(), dm.formation.duree, dtDemande.toLocaleDateString(), dm.status, act]);
      });
      $('#example tbody').on('click', 'button', function (this: any, event: any) {
        handleButons(this);
      });
    }, (error) => {
      console.log(error);
    });
  }

  conferme(id: number, type: string, empId: number, formId: number) {
    if (type === "accept") {
      this.case = "accept";
    }
    else if (type === "refuse") {
      this.case = "refuse"
    }
    this.demandeId = id;
    this.addEmpToForm.id1 = empId;
    this.addEmpToForm.id2 = formId;
  }

  accept(demandeId: number) {
    this.updDemande.id = demandeId;
    this.updDemande.status = 'accepte';
    this.formationService.updateDemande(this.updDemande).subscribe((res) => {
      // console.log(this.addEmpToForm);
      this.formationService.addEmpToFormation(this.addEmpToForm).subscribe((res) => {
        this.message = 'Successfuly!';
        console.log("accepted",this.addEmpToForm);
        $('#demandeModal').modal('hide');
      }, (error) => {
        console.log(error);
      });
    }, (error) => {
      console.log(error);
    });
  }

  refuse(demandeId: number) {
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
