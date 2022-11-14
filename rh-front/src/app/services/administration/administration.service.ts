import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AttestationResponse } from 'src/app/models/attestationResponse';
import { DemandeAttestationResponse } from 'src/app/models/demandeAttestationResponse';

@Injectable({
  providedIn: 'rootwks'
})
export class AdministrationService {

  url: string = "http://localhost:8088/";

  constructor(private httpClient: HttpClient) { }


  getAttestations(): Observable<AttestationResponse[]> {
    return this.httpClient.get<AttestationResponse[]>(this.url + "attestations");
  }

  getDemandeAttestations(): Observable<DemandeAttestationResponse[]> {
    return this.httpClient.get<DemandeAttestationResponse[]>(this.url + "demande-att");
  }

  deleteDemande(id: number): Observable<DemandeAttestationResponse[]> {
    return this.httpClient.delete<DemandeAttestationResponse[]>(this.url + "demande-att/" + id);
  }
  rejectDemande(id: number): Observable<DemandeAttestationResponse[]> {
    return this.httpClient.post<DemandeAttestationResponse[]>(this.url + "demande-att/reject/" + id, {});
  }
  acceptDemande(id: number): Observable<DemandeAttestationResponse[]> {
    return this.httpClient.post<DemandeAttestationResponse[]>(this.url + "demande-att/accept/" + id, {});
  }

  // addCollaborateur(newColl : AttestationRequest ) : Observable<CollRequest> {
  //   return this.httpClient.post<CollRequest>(this.url + "addCollaborateur", newColl);
  // }

}
