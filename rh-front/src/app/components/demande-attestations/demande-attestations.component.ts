import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DemandeAttestationResponse } from 'src/app/models/demandeAttestationResponse';
import { Employe } from 'src/app/models/employe';
import { Stagiaire } from 'src/app/models/stagiaire';
import { User } from 'src/app/models/user';
import { AdministrationService } from 'src/app/services/administration/administration.service';
import { GestionEmployeService } from 'src/app/services/gestion-employe/gestion-employe.service';
import { StagiaireService } from 'src/app/services/gestion-stagiaire/stagiaire.service';
import { UserService } from 'src/app/services/user/user.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
declare const $: any;
@Component({
  selector: 'app-demande-attestations',
  templateUrl: './demande-attestations.component.html',
  styleUrls: ['./demande-attestations.component.css']
})
export class DemandeAttestationsComponent implements OnInit {
  demandes: DemandeAttestationResponse[] = [];

  demande!: DemandeAttestationResponse;

  message: string = '';

  dashboardTableOptions = {
    "createdRow": this.createdRow
  }
  constructor(
    private administrationService: AdministrationService,
    private stagiaireService: StagiaireService,
    private gestionEmployeService: GestionEmployeService,
    private userService: UserService,
  ) {

  }

  ngOnInit(): void {
    this.getDemandeAttestations();
  }
  getDemandeAttestations = () => {
    this.administrationService.getDemandeAttestations().subscribe((response) => {
      this.dashboard.clear();
      this.demandes = response;
      this.reset();
    }, (error) => {
      console.log(error);
    })
  }

  @ViewChild(DashboardComponent) dashboard!: DashboardComponent;
  handleButons = (button: any) => {
    const type = button.getAttribute("type_");
    const id_ = button.parentNode.getAttribute("id_");
    const index_ = button.parentNode.getAttribute("index_");
    if (type === "reject") {
      this.rejectDemande(id_, index_);
    } if (type === "accept") {
      this.acceptDemande(id_, index_);
    } if (type === "delete") {
      this.deleteDemande(id_, index_);
    } if (type === "info") {
      this.voirInfo(id_, index_);
    }
  }
  reset = () => {
    const handleButons = this.handleButons;
    this.setItems();
    $('#example tbody').on('click', 'button', function (this: any, event: any) {
      handleButons(this);
    });
  }
  voirInfo(id: number, index: number) {
    const dem = this.demandes[index];
    this.demande = dem;

    const role = this.demande.user.userRole.toLocaleLowerCase();
    console.log({ role })
    if (role == "stagiaire") {
      this.demande.stagiaire = undefined;
      this.stagiaireService.getByUserId(this.demande.userId).subscribe((response) => {
        this.demande.stagiaire = response;
      });
    } else if (role == "employer") {
      this.demande.employe = undefined;
      this.gestionEmployeService.getByUserId(this.demande.userId).subscribe((response) => {
        this.demande.employe = response;
      });
    }
    // if (dem.type === "Stage")
    //   this.user = dem.stagiaire.user;
    // else if (dem.type === "Travail")
    //   this.user = dem.employe.user;

    //   const idUser = dem.idUser;

    //   if (dem.type === "Stage") {
    //     if (dem.stagiaire) {
    //       this.stagiaire = dem.stagiaire;
    //       this.user = this.employe.user;
    //       return;
    //     }
    //     this.stagiaireService.getByUserId(idUser).subscribe((res) => {
    //       this.stagiaire = res;
    //       this.employe = null as any;
    //       dem.stagiaire = this.stagiaire;
    //       this.user = this.stagiaire.user;
    //       // this.userService.getById(idUser).subscribe((res1) => {
    //       //   this.userContainer.user = res1;
    //       // });
    //     });
    //   } else if (dem.type == "Travail") {
    //     if (dem.employe) {
    //       this.employe = dem.employe;
    //       return;
    //     }
    //     this.gestionEmployeService.getByUserId(idUser).subscribe((res) => {
    //       this.employe = res;
    //       this.stagiaire = null as any;
    //       this.user = this.employe.user;
    //       dem.employe = this.employe;
    //     });
    //   } else {
    //     console.error("Invalid type of 'dem type'", dem.type)
    //   }
  }
  rejectDemande(id: number, index: number) {
    const dem = this.demandes.find((d) => d.id == id);
    if (dem && dem.etat == "Rejected") {
      console.log("Demande is already rejected");
      return;
    }
    this.administrationService.rejectDemande(id).subscribe((response) => {
      this.getDemandeAttestations();
    }, (error) => {
      console.log(error);
    });
  }
  acceptDemande(id: number, index: number) {
    const dem = this.demandes.find((d) => d.id == id);
    if (dem && dem.etat == "Accepted") {
      console.log("Demande is already Accepted");
      return;
    }
    this.administrationService.acceptDemande(id).subscribe((response) => {
      this.getDemandeAttestations();
    }, (error) => {
      console.log(error);
    });
  }
  deleteDemande(id: number, index: number) {
    this.administrationService.deleteDemande(id).subscribe((response) => {
      this.dashboard.clear();
      this.demandes.splice(index, 1);
      this.reset();
    }, (error) => {
      console.log(error);
    });
  }
  setItems(): void {
    this.demandes.forEach((att, i) => {
      this.dashboard.setItems(this.itemToRow(att, i) as any);
    })

  }
  createdRow(row: any, data: any, dataIndex: any, cells: any) {
    const colors: any = {
      "Waiting": "table-active",
      "Accepted": "table-success",
      "Rejected": "table-danger"
    }
    $(row).addClass(colors[data[5]]);
  }
  itemToRow(att: DemandeAttestationResponse, index: number) {
    console.log({ att });
    return [
      att.userId || "Null",
      att.poste || "Null",
      att.etablissement || "Null",
      att.type || "Null",
      att.date || "Null",
      att.etat || "Null",
      this.actions(att.id, index),
    ];

  }

  actions(id: number, index: number) {
    return `<div id_=${id} index_=${index} class="me-auto d-flex">
              <button data-toggle="tooltip" data-placement="bottom" title="Info"
              type_="info" class="btn btn-info me-2 btn-sm" data-bs-toggle="modal" data-bs-target="#infoDemande">
                <i class="bi bi-info-circle"></i>
              </button>
              <button data-toggle="tooltip" data-placement="bottom" title="Accept" 
              type_="accept" class="btn btn-success me-2 btn-sm" data-bs-toggle="modal" data-bs-target="#show">
                <i class="bi bi-check-circle"></i>
              </button>
              <button data-toggle="tooltip" data-placement="bottom" title="Reject" 
              type_="reject" class="btn btn-warning me-2 btn-sm" data-bs-toggle="modal" data-bs-target="#addFormation">
                <i class="bi bi-x-circle"></i>
              </button>
              <button data-toggle="tooltip" data-placement="bottom" title="Delete" 
              type_="delete" class="btn btn-danger me-2 btn-sm" data-bs-toggle="modal" data-bs-target="#deleteFormation">
                <i class="bi bi-trash3-fill"></i>
              </button>
          </div>`;
  }
}
