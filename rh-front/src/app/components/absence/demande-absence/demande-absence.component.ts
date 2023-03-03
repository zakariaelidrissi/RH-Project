import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DemandeRequest } from 'src/app/models/demandeRequest';
import { DemandeResponse } from 'src/app/models/demandeResponse';
import { AbsenceService } from 'src/app/services/absence/absence.service';
import { DashboardComponent } from '../../dashboard/dashboard.component';

declare const $: any;

@Component({
  selector: 'app-demande-absence',
  templateUrl: './demande-absence.component.html',
  styleUrls: ['./demande-absence.component.css']
})
export class DemandeAbsencesComponent implements OnInit {

  demandes: DemandeResponse[] = [];

  message: string = '';

  @ViewChild(DashboardComponent) dashboard!: DashboardComponent;

  constructor(private absService: AbsenceService, private router: Router) { }

  ngOnInit(): void {
    this.getAllDemande();
  }

  actions(demande: DemandeRequest, index: number) {
    var style = demande.statut === 'accepte' ? "style='cursor: not-allowed!important' disabled" : "";
    return '<div dm_=' + demande + ' index_=' + index + ' class="me-auto d-flex">' +
      '<button type_="accepte" class="btn btn-primary me-2 btn-sm" ' + style + ' title="" >' +
      '<i class="bi bi-check-lg"></i>' +
      '</button>' +
      '<button type_="refuse" class="btn btn-danger btn-sm" ' + style + '  title="supprimer une formation">' +
      '<i class="bi bi-trash3-fill"></i>' +
      '</button>' +
      '<a href="' + this.downloadLink(demande) + '" target="_blank" class="btn btn-success btn-sm ms-2" ' + style + '  title="télecharger le justificatif">' +
      '<i class="bi bi-download""></i>' +
      // '<a/>'+
      '</a>' +
      '</div>';
  }

  downloadLink(demande: DemandeRequest) {
    console.log({s:demande.justificatifFilename});
    
    return this.absService.urlDm + "/download/" + demande.id + "/" + demande.justificatifFilename;
  }

  onChangeDate() {
    this.getAllDemande();
  }

  getAllDemande() {
    this.absService.getDemandes().subscribe((response) => {
      this.demandes = response;
      console.log(this.demandes);
      const handleButons = this.handleButons;
      this.demandes.forEach((dm, index) => {
        var dtD: Date = new Date(dm.dateDebut);
        var dtF: Date = new Date(dm.dateFin);
        var username = dm.employe.user.nom + ' ' + dm.employe.user.prenom;
        if (dm.statut !== "") {
          this.dashboard.setItems(
            [username, dtD.toLocaleDateString(), dtF.toLocaleDateString(), dm.natureAbsence,
              dm.statut,
              this.actions(dm, index)]);
        }
        else {
          this.dashboard.setItems([username, dtD.toLocaleDateString(), dtF.toLocaleDateString(), dm.natureAbsence,
            dm.statut, "...."]);
        }
      });
      $('#example tbody').on('click', 'button', function (this: any, event: any) {
        handleButons(this);
      });
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }

  handleButons = (button: any) => {
    const type = button.getAttribute("type_");
    const index_ = button.parentNode.getAttribute("index_");
    const demande_ = this.demandes[index_];
    console.log({ demande_ });

    if (type === "accepte") {
      this.updateDemande(demande_, "accepte");
    } else if (type === "refuse") {
      this.updateDemande(demande_, "refuse");
    }
  }

  updateDemande(demande: DemandeRequest, statut: string) {
    demande.statut = statut;
    this.absService.updateDm(demande).subscribe((response) => {
      this.message = "Cette absence a été accepté avec succès!";
      this.dashboard.clear();
      this.getAllDemande();
    }, (error) => {
      console.log(error);
    });
  }

}
