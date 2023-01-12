import { Component, OnInit, ViewChild } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { AddById } from 'src/app/models/addById';
import { DemandeFormationRes } from 'src/app/models/demandeFormationRes';
import { Employe } from 'src/app/models/employe';
import { FormationResponse } from 'src/app/models/formationResponse';
import { User } from 'src/app/models/user';
import { CollService } from 'src/app/services/collaborateur/coll.service';
import { EmployeService } from 'src/app/services/employes/employe.service';
import { UserService } from 'src/app/services/user/user.service';
import { FormationService } from 'src/app/services/formation/formation.service';
import { MessagerieService } from 'src/app/services/messagerie/messagerie.service';
import { getCurrentUserByEmail } from 'src/app/utils';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { GestionEmployeService } from 'src/app/services/gestion-employe/gestion-employe.service';

declare const $: any;

@Component({
  selector: 'app-demande-formation',
  templateUrl: './demande-formation.component.html',
  styleUrls: ['./demande-formation.component.css']
})
export class DemandeFormationComponent implements OnInit {

  demandes: DemandeFormationRes[] = [];
  newDemande: AddById = new AddById();
  message: string = '';
  formations: FormationResponse[] = [];
  profile?: Keycloak.KeycloakProfile;
  currentUser?: User;
  emp?: Employe;
  // case : string = 'old';

  @ViewChild(DashboardComponent) dashboard!: DashboardComponent;

  constructor(kcService: KeycloakService, private formationService: FormationService, private collService: CollService,
    messagerieService: MessagerieService, private gestionEmployeService: GestionEmployeService, userService: UserService) {
    kcService.loadUserProfile().then(pr => {
      this.profile = pr;
      getCurrentUserByEmail(messagerieService, this.profile.email as string).then(user => {
        this.currentUser = user as User;
        this.gestionEmployeService.getByUserId(this.currentUser!.id).subscribe((res) => {
          this.emp = res;
          this.getDemandesFormation(this.emp!.id);
          this.getCollFormations(this.emp!.id);
        }, err => {
          console.error(err);
        });
      });
    })
  }

  ngOnInit(): void {

  }

  getDemandesFormation(dmId: number) {
    this.formationService.getDemandesByEmpId(dmId).subscribe((response) => {
      this.demandes = response;
      this.demandes.forEach(dm => {
        var dtDebut: Date = new Date(dm.formation.formationDate);
        var dtDm: Date = new Date(dm.demandeDate);
        // console.log(index);
        this.dashboard.setItems([dm.formation.name, dtDebut.toLocaleDateString(), dm.formation.duree, dtDm.toLocaleDateString(), dm.status]);
      });
    }, (error) => {
      console.log(error);
    });
  }

  addDemande(formationId: number, index: number) {
    this.newDemande.id1 = this.currentUser!.id;
    this.newDemande.id2 = formationId;
    this.formationService.addDemande(this.newDemande).subscribe((response) => {
      this.message = 'Success!';
      this.formations.splice(index, 1);
      // this.getCollFormations(this.currentUser!.id);
      this.getDemandesFormation(this.emp!.id);
      // $('#newDemande').modal("hide");
    }, (error) => {
      console.log(error);
    });
  }

  getCollFormations(id: number) {
    this.formationService.getFormationsByEmployeId(id).subscribe((res) => {
      this.formationService.getFormations().subscribe((response) => {
        // this.formations = response;
        response.forEach(form => {
          var k = 0;
          this.formations.forEach(f => {
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
