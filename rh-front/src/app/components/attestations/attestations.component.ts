import { Component, OnInit,ViewChild } from '@angular/core';
import { AttestationResponse } from 'src/app/models/attestationResponse';
import { AdministrationService } from 'src/app/services/administration/administration.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
const dataLength = 6;
@Component({
  selector: 'app-attestations',
  templateUrl: './attestations.component.html',
  styleUrls: ['./attestations.component.css']
})
export class AttestationsComponent implements OnInit {

  attestations : AttestationResponse[] = [];
  message : string = '';
  dataLength:number;
  
  @ViewChild(DashboardComponent) 
  dashboard!:DashboardComponent;

  constructor(private administrationService : AdministrationService) { 
    this.dataLength = this.load();
  }


  ngOnInit(): void {
    this.getAttestations();
  }

  load(){  
    const last = localStorage.getItem("lastDataLength");
    let dl = parseInt(last ? last : "NaN");
    if(!isFinite(dl)) {
      dl  = dataLength;
    }
    return dl;
  }
  
  getAttestations=()=> {
    this.administrationService.getAttestations().subscribe((response) => {
      this.attestations = response
      this.attestations.forEach(att=>{
        this.dashboard.setItems(this.attestationToRow(att));
      })
    }, (error) => {
      console.log(error);
    })
  }

  attestationToRow(att:AttestationResponse){
    return [att.nom,att.cin,att.poste,att.etablissement];
  }
}
