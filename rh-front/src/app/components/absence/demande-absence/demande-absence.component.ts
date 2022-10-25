import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  }

  getAllDemande() {
    this.absService.getDemandes().subscribe((response) => {
      this.demandes = response;
    }, (error) => {
      console.log(error);
    });
  }

  search() {
    // if (this.searchByDate != null) {
    //   this.absService.getAbsByDate(this.searchByDate).subscribe((response) => {
    //     this.demandes = response;
    //   }, (error) => {
    //     console.log(error);
    //   });
    // }
  }

}
