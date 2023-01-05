import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Stagiaire } from 'src/app/models/stagiaire';
import { StagiaireService } from 'src/app/services/gestion-stagiaire/stagiaire.service';
import { DashboardComponent } from '../dashboard/dashboard.component';

declare const $ : any;

@Component({
  selector: 'app-gestion-stagiaire',
  templateUrl: './gestion-stagiaire.component.html',
  styleUrls: ['./gestion-stagiaire.component.css']
})
export class GestionStagiaireComponent implements OnInit {

  stagiaires : Stagiaire[] = [];
  newStagiaire : Stagiaire = new Stagiaire();
  updStagiaire : Stagiaire = new Stagiaire();
  message : string = '';
  deleteStgId : number = 0;
  index : number = 0;

  @ViewChild(DashboardComponent) dashboard!:DashboardComponent;

  constructor(private stagiaireService : StagiaireService, private router : Router) { }

  ngOnInit(): void {
    this.getAllStagiare();
  }

  actions2(stgId : number, index: number) {
    return '<div id_='+stgId+' index_='+index+' class="me-auto d-flex">'+
              '<button type_="editStagiaire" class="btn btn-warning me-2 btn-sm"'+
                  'data-bs-toggle="modal" data-bs-target="#updateStagiaire">'+
                  '<i class="bi bi-pencil-square"></i>'+
              '</button>'+
              '<button type_="confirmDeleteStgiaire" class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteStagiaire"'+
                  '(click)="confirmDeleteStgiaire(stg.id, i)">'+
                  '<i class="bi bi-trash3-fill"></i>'+
              '</button>'+
          '</div>';
  }

  actions(stgId : number, index: number) {
    return '<div id_='+stgId+' index_='+index+' class="me-auto d-flex">'+              
              '<button type_="confirmDeleteStgiaire" class="btn btn-danger btn-sm" title="supprimer un stagiaire"'+
              'data-bs-toggle="modal" data-bs-target="#deleteStagiaire">'+                  
                  '<i class="bi bi-trash3-fill"></i>'+
              '</button>'+
          '</div>';
  }

  getAllStagiare() {
    this.stagiaireService.getStagiaire().subscribe((response) => {
      this.stagiaires = response;
      const handleButons = this.handleButons;
      this.stagiaires.forEach((stg,index) => {
        this.dashboard.setItems([stg.user.nom+' '+stg.user.prenom, stg.user.email, stg.user.tel, stg.niveau_etudes, stg.ville, stg.civilite, this.actions(stg.id, index)]);
      });
      $('#example tbody').on('click', 'button', function (this:any,event:any) {
        handleButons(this);
      } );
    }, (error) => {
      console.log(error);
    });
  }

  handleButons=(button:any)=>{
    const type = button.getAttribute("type_");
    const id_ = button.parentNode.getAttribute("id_");
    const index_ = button.parentNode.getAttribute("index_");
    console.log(type,id_)
    if(type === "editStagiaire"){
      this.editStagiaire(this.stagiaires.find(f=>f.id == id_) as Stagiaire);
    }else if(type === "confirmDeleteStgiaire"){
      this.confirmDeleteStgiaire(id_, index_);
    }
  }

  addStagiaire() {
    this.stagiaireService.addStagiaire(this.newStagiaire).subscribe((response) => {
      this.message = 'This Stagiaire well be added successfuly!';
      $('#addStagiaire').modal("hide");
      this.dashboard.clear();
      this.getAllStagiare();
    }, (error) => {
      console.log(error);
    });
  }

  editStagiaire(stagiaire : Stagiaire) {
    this.updStagiaire = stagiaire;
  }

  updateStagiare() {
    this.stagiaireService.updateStagiaire(this.updStagiaire).subscribe((response) => {
      this.message = 'This Stagiaire well be updated Successfuly!';
      $('#updateStagiaire').modal('hide');
      this.dashboard.clear();
      this.getAllStagiare();
    }, (error) => {
      console.log(error);
    });
  }

  confirmDeleteStgiaire(stagiaireId : number, i : number) {
    this.deleteStgId = stagiaireId;
    this.index = i;
  }

  deleteStagiaire(stagiaireId : number, index : number) {
    this.stagiaireService.deleteStagiaire(stagiaireId).subscribe((response) => {
      this.message = 'This Stagiaire well be deleted Successfuly!';
      $('#deleteStagiaire').modal('hide');
      this.stagiaires.splice(this.index, 1);
      this.dashboard.clear();
      this.getAllStagiare();
    }, (error) => {
      console.log(error);
    });
  }


}
