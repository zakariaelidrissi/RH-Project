import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DemandeAttestationResponse } from 'src/app/models/demandeAttestationResponse';
import { User } from 'src/app/models/user';
import { AdministrationService } from 'src/app/services/administration/administration.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
declare const $: any;
@Component({
  selector: 'app-demande-attestations',
  templateUrl: './demande-attestations.component.html',
  styleUrls: ['./demande-attestations.component.css']
})
export class DemandeAttestationsComponent implements OnInit {
  demandes: DemandeAttestationResponse[] = [];
  user: User = this.blankUser();
  message: string = '';
  blankUser() {
    const user = new User();
    user.id = 10;
    user.genre = 'Male'
    user.nom = 'Khtou';
    user.prenom = 'Othmane';
    user.email = 'Othmane@Othmane.com';
    user.tel = '+21222222222';
    user.userRole = 'Stagiaire';
    user.emailVerified = false;

    return user;
  }
  dashboardTableOptions = {
    "createdRow": this.createdRow
  }
  constructor(private administrationService: AdministrationService, private router: Router) {

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
      // this.voirInfo(id_);
    }
  }
  reset = () => {
    const handleButons = this.handleButons;
    this.setItems();
    $('#example tbody').on('click', 'button', function (this: any, event: any) {
      handleButons(this);
    });
  }
  voirInfo(id: number) {
    this.router.navigateByUrl('/second');
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
    return [
      att.idUser || "Null",
      att.poste || "Null",
      att.etablissement || "Null",
      att.type || "Null",
      att.date || "Null",
      att.etat || "Null",
      this.actions(att.id, index),
    ];

  }

  actions(id: number, index: number) {
    return `<div id_=' + id + ' index_=' + index + ' class="me-auto d-flex">
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
