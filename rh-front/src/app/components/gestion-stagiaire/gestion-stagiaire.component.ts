import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Stagiaire } from 'src/app/models/stagiaire';
import { StagiaireService } from 'src/app/services/gestion-stagiaire/stagiaire.service';

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


  constructor(private stagiaireService : StagiaireService, private router : Router) { }

  ngOnInit(): void {
    this.getAllStagiare();
  }

  getAllStagiare() {
    this.stagiaireService.getStagiaire().subscribe((response) => {
      this.stagiaires = response;
    }, (error) => {
      console.log(error);
    });
  }

  addStagiaire() {
    this.stagiaireService.addStagiaire(this.newStagiaire).subscribe((response) => {
      this.message = 'This Stagiaire well be added successfuly!';
      $('#addStagiaire').modal("hide");
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
    }, (error) => {
      console.log(error);
    });
  }


}
