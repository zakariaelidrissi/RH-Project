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
  
  @ViewChild(DashboardComponent) 
  dashboard!:DashboardComponent;

  constructor(private administrationService : AdministrationService) { 
    this.dataLength = this.load();
  }


  ngOnInit(): void {
    this.getAttestations();
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

  setItems():void{
    this.attestations.forEach(att=>{
      this.dashboard.setItems(this.itemToRow(att));
    })
  }
  itemToRow(att:AttestationResponse){
    return [att.nom,att.cin,att.poste,att.etablissement];
  }
}