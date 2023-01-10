import { Component, OnInit, ViewChild } from '@angular/core';
import { DemandeAttestationType } from 'src/app/models/demandeAttestationType';
import { AdministrationService } from 'src/app/services/administration/administration.service';
import { DemandeAttestationRequest } from 'src/app/models/demandeAttestationResquest';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { DemandeAttestationEtat } from 'src/app/models/demandeAttestationEtat';
import { User } from 'src/app/models/user';
import { MessagerieService } from 'src/app/services/messagerie/messagerie.service';
import { KeycloakService } from 'keycloak-angular';
import { getCurrentUserByEmail } from 'src/app/utils';

declare const $: any;

@Component({
  selector: 'app-employe-attestations',
  templateUrl: './employe-attestations.component.html',
  styleUrls: ['./employe-attestations.component.css']
})
export class EmployeAttestationsComponent implements OnInit {

  currentUser?: User;
  profile?: Keycloak.KeycloakProfile;
  selectedItem: string = '';
  types: any = [DemandeAttestationType.Stage, DemandeAttestationType.Travail]

  newDemande?: DemandeAttestationRequest;
  message: string = '';

  @ViewChild(DashboardComponent) dashboard!: DashboardComponent;

  constructor(private kcService: KeycloakService, private adminService: AdministrationService, private messagerieService: MessagerieService) {
    kcService.loadUserProfile().then(pr => {
      this.profile = pr;
      getCurrentUserByEmail(messagerieService, this.profile.email as string).then(user => {
        this.currentUser = user as User;
        this.getAllAttByUserId(this.currentUser!.id);
      });
    })
  }

  ngOnInit(): void {

  }
  actions(demandeId: number, etat: boolean) {
    const status = !etat ? "disabled" : "";
    if (etat) {
      return '<div id_=' + demandeId + ' class="me-auto d-flex">' +
        '<button  type_="download" class="btn btn-primary btn-sm ms-3">' +
        '<i class="bi bi-download"></i>' +
        '</button>' +
        '</div>';
    } else {
      return '<div id_=' + demandeId + ' class="me-auto d-flex">' +
        '<button  type_="download" class="btn btn-danger btn-sm ms-3" ' + status + '>' +
        '<i class="bi bi-download"></i>' +
        '</button>' +
        '</div>';
    }
  }

  handleButons = (button: any) => {
    const type = button.getAttribute("type_");
    const id_ = button.parentNode.getAttribute("id_");

    if (type === "download") {
      this.downloadAtt(id_);
    }
  }

  getAllAttByUserId(userId: number) {
    this.adminService.getDemandeAttestationsByUserId(userId).subscribe((res) => {
      const handleButons = this.handleButons;
      res.forEach(att => {
        var dt: Date = new Date(att.date);
        // if (att.etat === DemandeAttestationEtat.Accepted) {
        this.dashboard.setItems([att.id.toString(), att.type, dt.toLocaleDateString(), att.etat, this.actions(att.id, att.etat === DemandeAttestationEtat.Accepted)]);
        // }else {
        // this.dashboard.setItems([att.id.toString(), att.type, dt.toLocaleDateString(), att.etat, '---']);
        // }
      });
      $('#example tbody').on('click', 'button', function (this: any, event: any) {
        handleButons(this);
      });
    }, (error) => {
      console.log(error);
    });
  }

  addDemande() {
    if (this.selectedItem !== '') {
      this.newDemande = new DemandeAttestationRequest();
      this.newDemande.userId = this.currentUser!.id;
      this.newDemande.type = this.types[this.selectedItem];
      console.log(this.newDemande);
      this.adminService.demanderAttestation(this.newDemande).subscribe((res) => {
        this.message = 'successfuly';
        this.getAllAttByUserId(this.currentUser!.id);
        $('#addDemande').modal("hide");
      });
    }
  }

  downloadAtt(demandeId: number) {
    this.adminService.downloadAttestationPdf(demandeId).subscribe((res) => {
      this.message = 'Loading...';
    }, (error) => {
      console.log(error);
    });
  }

}
