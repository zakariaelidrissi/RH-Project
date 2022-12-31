import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DemandeAttestationResponse } from 'src/app/models/demandeAttestationResponse';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  url = "http://localhost:8090/";

  constructor(private httpClient : HttpClient) { }

  getAllAttByUserId(userId : number) : Observable<DemandeAttestationResponse[]> {
    return this.httpClient.get<DemandeAttestationResponse[]>(this.url + 'employe/getAtt/' + userId);
  }

}
