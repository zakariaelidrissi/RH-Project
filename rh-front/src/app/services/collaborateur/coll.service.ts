import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Collaborateur } from 'src/app/models/collaborateur';
import { CollRequest } from 'src/app/models/collRequest';

@Injectable({
  providedIn: 'root'
})
export class CollService {

  url : string = "http://localhost:8083/";

  constructor(private httpClient : HttpClient) { }

  getCollaborateur() : Observable<Collaborateur[]>{
    return this.httpClient.get<Collaborateur[]>(this.url + "listCollaborateurs");
  }

  addCollaborateur(newColl : CollRequest ) : Observable<CollRequest> {
    return this.httpClient.post<CollRequest>(this.url + "addCollaborateur", newColl);
  }

  deleteCollaborateur(employerId : number) : Observable<any> {
    return this.httpClient.delete<any>(this.url + "deleteColl/" + employerId);
  }

  getCollById(employeId : number) : Observable<Collaborateur> {
    return this.httpClient.get<Collaborateur>(this.url + 'collaborateurs/employe/' + employeId);
  }

}
