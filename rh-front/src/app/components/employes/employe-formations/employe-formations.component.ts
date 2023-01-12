import { Component, OnInit, ViewChild } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Collaborateur } from 'src/app/models/collaborateur';
import { Employe } from 'src/app/models/employe';
import { FormationResponse } from 'src/app/models/formationResponse';
import { User } from 'src/app/models/user';
import { CollService } from 'src/app/services/collaborateur/coll.service';
import { EmployeService } from 'src/app/services/employes/employe.service';
import { MessagerieService } from 'src/app/services/messagerie/messagerie.service';
import { UserService } from 'src/app/services/user/user.service';
import { getCurrentUserByEmail } from 'src/app/utils';
import { DashboardComponent } from '../../dashboard/dashboard.component';

declare const $: any;

@Component({
  selector: 'app-employe-formations',
  templateUrl: './employe-formations.component.html',
  styleUrls: ['./employe-formations.component.css']
})
export class EmployeFormationsComponent implements OnInit {

  formations: FormationResponse[] = [];

  currentUser?: User;
  profile?: Keycloak.KeycloakProfile;
  emp? : Employe;

  @ViewChild(DashboardComponent) dashboard!: DashboardComponent;

  constructor(kcService: KeycloakService, messagerieService: MessagerieService, private collService: CollService
    , private empService : EmployeService,userService:UserService) {
    kcService.loadUserProfile().then(pr => {
      this.profile = pr;
      getCurrentUserByEmail(messagerieService, this.profile.email as string).then(user => {
        this.currentUser = user as User;
        this.empService.getEmpByUserId(this.currentUser!.id).subscribe((res) => {
          this.emp = res;
          this.getAllFormation(this.emp!.id);
        },err=>{
          console.error({err});
        });
      });
    })
  }

  ngOnInit(): void { }

  getAllFormation(id: number) {
    this.collService.getCollaborateurByEmpId(id).subscribe((response) => {
      this.formations = response.formations;
      // const handleButons = this.handleButons;
      this.formations.forEach(form => {
        var dt: Date = new Date(form.formationDate);
        // console.log(index);
        this.dashboard.setItems([form.name, dt.toLocaleDateString(), form.duree, form.objectif]);
      });
      // $('#example tbody').on('click', 'button', function (this:any,event:any) {
      //   handleButons(this);
      // } );
    }, (error) => {
      console.log(error);
    });
  }



}
