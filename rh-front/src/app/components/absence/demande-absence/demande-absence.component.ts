import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DemandeRequest } from 'src/app/models/demandeRequest';
import { DemandeResponse } from 'src/app/models/demandeResponse';
import { AbsenceService } from 'src/app/services/absence/absence.service';

@Component({
  selector: 'app-demande-absence',
  templateUrl: './demande-absence.component.html',
  styleUrls: ['./demande-absence.component.css']
})
export class DemandeAbsenceComponent implements OnInit {

  demandes : DemandeResponse[] = [];
  searchByDate : Date = new Date();

  message : string = '';

  constructor(private absService : AbsenceService, private router : Router) { }

  ngOnInit(): void {
    this.getAllDemande();
  }

  onChangeDate() {
    this.getAllDemande();
  }

  getAllDemande() {
    this.absService.getDemandes().subscribe((response) => {
      this.demandes = response;
    }, (error) => {
      console.log(error);
    });
  }

  search() {
    this.getAbs(this.searchByDate);
  }

  getAbs(date : Date){
    var abs : DemandeResponse[] = [];
    for (var i=0; i<this.demandes.length; i++) {
      if (this.demandes[i].dateDebut === date){
        abs.push(this.demandes[i]);
      }
    }
    this.demandes = abs;
  }

  updateDemande(demande : DemandeRequest, statut : string) {
    demande.statut = statut;
    this.absService.updateDm(demande).subscribe((response) => {
      this.message = "Cette absence a été accepté avec succès!";
      this.getAllDemande();
    }, (error) => {
      console.log(error);
    });
  }

}
