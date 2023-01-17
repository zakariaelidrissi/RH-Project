import { Component, OnInit, ViewChild } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { DemandeRequest } from 'src/app/models/demandeRequest';
import { DemandeResponse } from 'src/app/models/demandeResponse';
import { Employe } from 'src/app/models/employe';
import { User } from 'src/app/models/user';
import { AbsenceService } from 'src/app/services/absence/absence.service';
import { EmployeService } from 'src/app/services/employes/employe.service';
import { MessagerieService } from 'src/app/services/messagerie/messagerie.service';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { getCurrentUserByEmail } from 'src/app/utils';
import { UserService } from 'src/app/services/user/user.service';

declare const $: any;

@Component({
  selector: 'app-demande-absence',
  templateUrl: './demande-absence.component.html',
  styleUrls: ['./demande-absence.component.css']
})
export class DemandeAbsenceComponent implements OnInit {

  demandes: DemandeResponse[] = [];
  newDemande: DemandeRequest = new DemandeRequest();
  message: string = '';

  @ViewChild(DashboardComponent) dashboard!: DashboardComponent;
  @ViewChild("inputFile") inputFile!: any;
  profile?: Keycloak.KeycloakProfile;
  currentUser?: User;
  emp?: Employe;

  constructor(private absService: AbsenceService, private empService: EmployeService
    , kcService: KeycloakService, messagerieService: MessagerieService, userService: UserService) {
    this.newDemande.natureAbsence = 'NONJUSTIFIEE';
    kcService.loadUserProfile().then(pr => {
      this.profile = pr;
      getCurrentUserByEmail(messagerieService, this.profile.email as string).then(user => {
        this.currentUser = user as User;
        this.empService.getEmpByUserId(this.currentUser!.id).subscribe((res) => {
          this.emp = res;
          this.getDmByEmpId(this.emp!.id);
        }, err => {
          console.error(err);
        });
      });
    })
  }

  ngOnInit(): void {

  }

  getDmByEmpId(id: number) {
    this.absService.getDmByEmpId(id).subscribe((res) => {
      this.demandes = res;
      this.demandes.forEach(dm => {
        var dtD: Date = new Date(dm.dateDebut);
        var dtF: Date = new Date(dm.dateFin);
        this.dashboard.setItems([dm.id.toString(), dtD.toLocaleDateString(), dtF.toLocaleDateString(), dm.natureAbsence, dm.statut]);
      })
    }, (error) => {
      console.log(error);
    });
  }

  addDemande() {
    this.newDemande.statut = 'Waiting';
    this.newDemande.employeId = this.emp!.id;
    const file = this.inputFile.nativeElement.value;
    this.absService.addDemande(this.newDemande).subscribe((res) => {
      this.message = 'Successfuly!';
      $('#addDemande').modal('hide');
      this.dashboard.clear();
      this.getDmByEmpId(this.emp!.id);
    }, (error) => {
      console.log(error);
    })
  }

}
