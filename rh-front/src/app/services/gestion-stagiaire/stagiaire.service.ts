import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Stagiaire } from 'src/app/models/stagiaire';

@Injectable({
  providedIn: 'root'
})
export class StagiaireService {

  url : string = "http://localhost:8083/stagiaires";

  constructor(private httpClient: HttpClient) { }

  getStagiaire(): Observable<Stagiaire[]> {
    return this.httpClient.get<Stagiaire[]>(this.url);
  }

  addStagiaire(newStagiaire: Stagiaire): Observable<Stagiaire> {
    return this.httpClient.post<Stagiaire>(this.url + "/", newStagiaire);
  }

  updateStagiaire(updateStagiaire: Stagiaire): Observable<Stagiaire> {
    return this.httpClient.put<Stagiaire>(this.url + "/" + updateStagiaire.id, updateStagiaire);
  }

  deleteStagiaire(stagiaireId: number): Observable<any> {
    return this.httpClient.delete<any>(this.url + "/" + stagiaireId);
  }

  getByUserId(userId: number): Observable<Stagiaire> {
    return this.httpClient.get<Stagiaire>(this.url + "/user/" + userId);
  }

}
