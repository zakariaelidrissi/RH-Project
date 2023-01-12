import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CollRequest } from 'src/app/models/collRequest';

@Injectable({
  providedIn: 'root'
})
export class CollService {

  url: string = "http://localhost:8085/collaborateurs";
  url2: string = "http://localhost:8085/coll";
  // url : string = "http://localhost:8888/FORMATION-SERVICE/collaborateurs";

  constructor(private httpClient: HttpClient) { }

  // getCollaborateur(): Observable<Collaborateur[]> {
  //   return this.httpClient.get<Collaborateur[]>(this.url);
  // }

  // getCollaborateurByEmpId(id: number): Observable<Collaborateur> {
  //   return this.httpClient.get<Collaborateur>(this.url + '/employe/' + id);
  // }

  // getColl(): Observable<any[]> {
  //   return this.httpClient.get<any[]>(this.url2);
  // }

  // addCollaborateur(newColl: CollRequest): Observable<CollRequest> {
  //   return this.httpClient.post<CollRequest>(this.url, newColl);
  // }

  // deleteCollaborateur(employerId: number): Observable<any> {
  //   return this.httpClient.delete<any>(this.url + "/" + employerId);
  // }

  // getCollById(employeId: number): Observable<Collaborateur> {
  //   return this.httpClient.get<Collaborateur>(this.url + '/employe/' + employeId);
  // }

}
