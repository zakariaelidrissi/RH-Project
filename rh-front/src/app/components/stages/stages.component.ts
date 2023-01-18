import { Component, OnInit, ViewChild } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { OffreStage } from 'src/app/models/offreStage';
import { Stagiaire } from 'src/app/models/stagiaire';
import { User } from 'src/app/models/user';
import { StagiaireService } from 'src/app/services/gestion-stagiaire/stagiaire.service';
import { MessagerieService } from 'src/app/services/messagerie/messagerie.service';
import { StageService } from 'src/app/services/offre-stage/stage.service';
import { UserService } from 'src/app/services/user/user.service';
import { getCurrentUserByEmail } from 'src/app/utils';

declare const $: any;

@Component({
  selector: 'app-stages',
  templateUrl: './stages.component.html',
  styleUrls: ['./stages.component.css']
})
export class StagesComponent implements OnInit {

  page: number = 1;
  count: number = 0;
  pageSize : number = 10;
  pageSizes : any = [5, 10, 15, 20, 30, 50, 100]

  stages : OffreStage[] = [];
  stage : OffreStage = new OffreStage();

  sendingMessage: boolean = false;
  files: File[] = [];
  profile?: Keycloak.KeycloakProfile;
  currentUser: User = new User();
  stg! : Stagiaire;
  
  @ViewChild("inputFile") inputFile!: any;

  // constructor() { }

  constructor(private stageService : StageService, private stgService : StagiaireService
    , kcService: KeycloakService, messagerieService: MessagerieService, userService: UserService) {    
    kcService.loadUserProfile().then(pr => {
      this.profile = pr;
      getCurrentUserByEmail(messagerieService, this.profile.email as string).then(user => {
        this.currentUser = user as User;
        this.stgService.getStgByUserId(this.currentUser!.id).subscribe((res) => {
          this.stg = res;          
        }, err => {
          console.error(err);
        });
      }, err => {
        console.error(err);

      });
    })
  }

  ngOnInit(): void {
    this.getAllStages();
  }

  getAllStages() {
    this.stageService.getAllStages().subscribe((res) => {
      this.stages = res;
      console.log(res);
    }, (error) => {
      console.log(error);
    })
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.stages;
  }

  showMore(stage : OffreStage){
    this.stage = stage;
  }

  uploadCv() {
    const file = this.inputFile.nativeElement.files[0] as File;
    const form = new FormData();
    form.append("file", file);
    form.append("sid", "" + this.stg.id);
    this.stgService.uploadCv(form).subscribe((res) => {
      $('#attachFile').modal('hide');
    }, error => {
      console.error(error);
      
    })
  }

}
