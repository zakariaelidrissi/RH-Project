import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AttestationResponse } from 'src/app/models/attestationResponse';
import { DemandeAttestationResponse } from 'src/app/models/demandeAttestationResponse';
import { DemandeAttestationRequest } from 'src/app/models/demandeAttestationResquest';

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {

  url: string = "http://localhost:8088/";

  constructor(private httpClient: HttpClient) { }

  demanderAttestation(body: DemandeAttestationRequest): Observable<DemandeAttestationResponse> {
    return this.httpClient.post<DemandeAttestationResponse>(this.url + "demande-att", body);
  }

  getAttestations(): Observable<AttestationResponse[]> {
    return this.httpClient.get<AttestationResponse[]>(this.url + "attestations");
  }

  getDemandeAttestations(): Observable<DemandeAttestationResponse[]> {
    return this.httpClient.get<DemandeAttestationResponse[]>(this.url + "demande-att");
  }

  deleteDemande(id: number): Observable<DemandeAttestationResponse[]> {
    return this.httpClient.delete<DemandeAttestationResponse[]>(this.url + "demande-att/" + id);
  }
  rejectDemande(id: number): Observable<any> {
    return this.httpClient.post(this.url + "demande-att/reject/" + id, {});
  }
  acceptDemande(id: number): Observable<any> {
    return this.httpClient.post(this.url + "demande-att/accept/" + id, {});
  }
  downloadAttestationPdf(demandeId: number): Observable<any> {
    return this.httpClient.get(this.url + "attestations/pdf/" + demandeId);
  }
  getDemandeAttestationsByUserId(userId: number): Observable<DemandeAttestationResponse[]> {
    return this.httpClient.get<DemandeAttestationResponse[]>(this.url + "demande-att/user/" + userId);
  }

  // addCollaborateur(newColl : AttestationRequest ) : Observable<CollRequest> {
  //   return this.httpClient.post<CollRequest>(this.url + "addCollaborateur", newColl);
  // }

}
