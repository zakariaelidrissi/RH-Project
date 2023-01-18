import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OffreStage } from 'src/app/models/offreStage';
import { PostulationRequest } from 'src/app/models/postulationRequest';
import { PostulationResponse } from 'src/app/models/postulationResponse';

@Injectable({
  providedIn: 'root'
})
export class StageService {

  url : string = "http://localhost:8089/offre/stages";
  urlPos : string = "http://localhost:8089/postulations";
  // url : string = "http://localhost:8888/OFFRE-STAGE-SERVICE/offre/stages";

  constructor(private httpClient : HttpClient) { }

  getAllStages() : Observable<OffreStage[]> {
    return this.httpClient.get<OffreStage[]>(this.url);
  }

  getStageById(stageId : number) : Observable<OffreStage> {
    return this.httpClient.get<OffreStage>(this.url + "/" + stageId);
  }

  addOffreStage(newOffre : OffreStage) : Observable<OffreStage> {
    return this.httpClient.post<OffreStage>(this.url, newOffre);
  }

  updateStage(updStage : OffreStage) : Observable<OffreStage> {
    return this.httpClient.put<OffreStage>(this.url, updStage);
  }

  delateStage(stageId : number) : Observable<any> {
    return this.httpClient.delete(this.url + "/" + stageId);
  }

  // ********************* Postulation *********************
  getAllPostulation() : Observable<PostulationResponse[]> {
    return this.httpClient.get<PostulationResponse[]>(this.urlPos);
  }

  addPostulation(newPos : PostulationRequest) : Observable<PostulationRequest> {
    return this.httpClient.post<PostulationRequest>(this.urlPos, newPos);
  }

  updatePostulation(updPos : PostulationRequest) : Observable<PostulationRequest> {
    return this.httpClient.put<PostulationRequest>(this.urlPos, updPos);
  }

  deletePostulation(posId : number) : Observable<any> {
    return this.httpClient.delete<any>(this.urlPos + '/' + posId);
  }  

}
