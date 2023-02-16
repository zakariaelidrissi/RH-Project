import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Stagiaire } from 'src/app/models/stagiaire';
import { DemandeResponse } from 'src/app/models/demandeResponse';

@Injectable({
  providedIn: 'root'
})
export class StagiaireService {

  url : string = "http://localhost:8083/";
  // url : string = "http://localhost:8888/STAGIAIRE-SERVICE/stagiaires";

  constructor(private httpClient: HttpClient) { }

  getStagiaire(): Observable<Stagiaire[]> {
    return this.httpClient.get<Stagiaire[]>(this.url + 'stagiaires');
  }

  getByUserId(userId: number): Observable<Stagiaire> {
    return this.httpClient.get<Stagiaire>(this.url + "/stagiaires/user/" + userId);
  }

  addStagiaire(newStagiaire: Stagiaire): Observable<Stagiaire> {
    return this.httpClient.post<Stagiaire>(this.url + "stagiaires/", newStagiaire);
  }

  updateStagiaire(updateStagiaire: Stagiaire): Observable<Stagiaire> {
    return this.httpClient.put<Stagiaire>(this.url + "stagiaires/" + updateStagiaire.id, updateStagiaire);
  }

  deleteStagiaire(stagiaireId: number): Observable<any> {
    return this.httpClient.delete<any>(this.url + "stagiaires/" + stagiaireId);
  }

  getStgByUserId(userId: number): Observable<Stagiaire> {
    return this.httpClient.get<Stagiaire>(this.url + "stagiaires/user/" + userId);
  }

  uploadCv(data: FormData): Observable<Stagiaire> {
    return this.httpClient.post<Stagiaire>(this.url + "/upload-cv", data);
  }

}
