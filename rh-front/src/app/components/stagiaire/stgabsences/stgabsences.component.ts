import { Component, OnInit, ViewChild } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { AbsenceStgResponse } from 'src/app/models/absenceStgResponse';
import { Stagiaire } from 'src/app/models/stagiaire';
import { User } from 'src/app/models/user';
import { AbsenceService } from 'src/app/services/absence/absence.service';
import { StagiaireService } from 'src/app/services/gestion-stagiaire/stagiaire.service';
import { MessagerieService } from 'src/app/services/messagerie/messagerie.service';
import { UserService } from 'src/app/services/user/user.service';
import { getCurrentUserByEmail } from 'src/app/utils';
import { DashboardComponent } from '../../dashboard/dashboard.component';

declare const $: any;

@Component({
  selector: 'app-stgabsences',
  templateUrl: './stgabsences.component.html',
  styleUrls: ['./stgabsences.component.css']
})
export class StgabsencesComponent implements OnInit {

  absences : AbsenceStgResponse[] = [];
  message : string = '';
  
  @ViewChild(DashboardComponent) dashboard!: DashboardComponent;
  profile?: Keycloak.KeycloakProfile;
  currentUser?: User;
  stg? : Stagiaire;
  
  constructor(kcService: KeycloakService, messagerieService: MessagerieService, private absService: AbsenceService
    , private stgService : StagiaireService, userService : UserService) {
    kcService.loadUserProfile().then(pr => {
      this.profile = pr;
      getCurrentUserByEmail(messagerieService, this.profile.email as string).then(user => {
        this.currentUser = user as User;
        this.stgService.getByUserId(this.currentUser!.id).subscribe((res) => {
          this.stg = res;
          this.getAllStgAbs(this.stg!.id);
        }, err => {
          console.error(err);          
        })
      });
    })
  }

  ngOnInit(): void {

  }

  getAllStgAbs(stgId: number) {
    this.absService.getStgAbsencesById(stgId).subscribe((res) => {
      this.absences = res;
      console.log(res);
      this.absences.forEach(abs => {
        var dt: Date = new Date(abs.dateAbs);
        // console.log(index);
        this.dashboard.setItems([abs.id.toString(), dt.toLocaleDateString(), abs.natureAbsence, abs.duree]);
      });
    })
  }

}
