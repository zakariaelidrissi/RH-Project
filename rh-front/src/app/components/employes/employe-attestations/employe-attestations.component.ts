import { Component, OnInit } from '@angular/core';
import { DemandeAttestationType } from 'src/app/models/demandeAttestationType';
import { AdministrationService } from 'src/app/services/administration/administration.service';
import { DemandeAttestationRequest } from 'src/app/models/demandeAttestationResquest';

declare const $: any;

@Component({
  selector: 'app-employe-attestations',
  templateUrl: './employe-attestations.component.html',
  styleUrls: ['./employe-attestations.component.css']
})
export class EmployeAttestationsComponent implements OnInit {

  empId : number = 2;
  selectedItem : string = '';
  // types :any= { "Stage":DemandeAttestationType.Stage, "Travail":DemandeAttestationType.Travail}
  types :any= [DemandeAttestationType.Stage, DemandeAttestationType.Travail]

  newDemande ?: DemandeAttestationRequest;
  message : string = '';

  
  constructor(private adminService : AdministrationService) { }

  ngOnInit(): void {
  }

  addDemande(){
    if (this.selectedItem !== ''){
      this.newDemande = new DemandeAttestationRequest();
      this.newDemande.userId = this.empId;
      this.newDemande.type = this.types[this.selectedItem];
      this.adminService.demanderAttestation(this.newDemande).subscribe((res) => {
        this.message = 'successfuly';
        $('#addDemande').modal("hide");
      });
    }
  }

}
