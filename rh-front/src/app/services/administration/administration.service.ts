import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { AttestationResponse } from 'src/app/models/attestationResponse';

@Injectable({
  providedIn: 'root'
})
export class AdministrationService{

  url : string = "http://localhost:8088/";

  constructor(private httpClient : HttpClient) { }
    

  getAttestations() : Observable<AttestationResponse[]>{
    return this.httpClient.get<AttestationResponse[]>(this.url + "attestations");
  }

  // addCollaborateur(newColl : AttestationRequest ) : Observable<CollRequest> {
  //   return this.httpClient.post<CollRequest>(this.url + "addCollaborateur", newColl);
  // }

}
