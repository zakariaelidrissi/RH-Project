import { Component, OnInit, ViewChild } from '@angular/core';
import { AttestationResponse } from 'src/app/models/attestationResponse';
import { AdministrationService } from 'src/app/services/administration/administration.service';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-attestations',
  templateUrl: './attestations.component.html',
  styleUrls: ['./attestations.component.css']
})

export class AttestationsComponent implements OnInit {

  attestations: AttestationResponse[] = [];
  message: string = '';

  constructor(private administrationService: AdministrationService) {

  }

  ngOnInit(): void {
    this.getAttestations();
  }
  getAttestations = () => {
    this.administrationService.getAttestations().subscribe((response) => {
      this.attestations = response;
      this.setItems();
    }, (error) => {
      console.log(error);
    })
  }

  @ViewChild(DashboardComponent) dashboard!: DashboardComponent;
  setItems(): void {
    this.attestations.forEach(att => {
      this.dashboard.setItems(this.itemToRow(att));
    })
  }
  itemToRow(att: AttestationResponse) {
    console.log({att});
    
    return [att.nom ?? " ", att.cin ?? " ", att.etablissement ?? " ", att.type ?? " "];
  }
}