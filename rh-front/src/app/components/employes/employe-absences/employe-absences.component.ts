import { Component, OnInit, ViewChild } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { AbsenceEmpResponse } from 'src/app/models/absenceEmpResponse';
import { Employe } from 'src/app/models/employe';
import { User } from 'src/app/models/user';
import { AbsenceService } from 'src/app/services/absence/absence.service';
import { EmployeService } from 'src/app/services/employes/employe.service';
import { MessagerieService } from 'src/app/services/messagerie/messagerie.service';
import { UserService } from 'src/app/services/user/user.service';
import { getCurrentUserByEmail } from 'src/app/utils';
import { DashboardComponent } from '../../dashboard/dashboard.component';

@Component({
  selector: 'app-employe-absences',
  templateUrl: './employe-absences.component.html',
  styleUrls: ['./employe-absences.component.css']
})
export class EmployeAbsencesComponent implements OnInit {

  absences: AbsenceEmpResponse[] = [];

  @ViewChild(DashboardComponent) dashboard!: DashboardComponent;
  profile?: Keycloak.KeycloakProfile;
  currentUser?: User;
  emp? : Employe;

  constructor(kcService: KeycloakService, messagerieService: MessagerieService, private absService: AbsenceService
    , private empService : EmployeService, userService : UserService) {
    kcService.loadUserProfile().then(pr => {
      this.profile = pr;
      getCurrentUserByEmail(messagerieService, this.profile.email as string).then(user => {
        this.currentUser = user as User;
        this.empService.getEmpByUserId(this.currentUser!.id).subscribe((res) => {
          this.emp = res;
          this.getAllEmpAbs(this.emp!.id);
        }, err => {
          console.error(err);          
        })
      });
    })
  }

  ngOnInit(): void {

  }

  getAllEmpAbs(empId: number) {
    this.absService.getEmpAbsencesById(empId).subscribe((res) => {
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
