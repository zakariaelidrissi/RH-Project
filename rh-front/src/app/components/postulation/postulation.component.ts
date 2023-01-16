import { Component, OnInit, ViewChild } from '@angular/core';
import { PostulationRequest } from 'src/app/models/postulationRequest';
import { PostulationResponse } from 'src/app/models/postulationResponse';
import { StageService } from 'src/app/services/offre-stage/stage.service';
import { DashboardComponent } from '../dashboard/dashboard.component';

declare const $: any;

@Component({
  selector: 'app-postulation',
  templateUrl: './postulation.component.html',
  styleUrls: ['./postulation.component.css']
})
export class PostulationComponent implements OnInit {

  message: string = '';
  postulations : PostulationResponse[] = [];
  newPos : PostulationRequest = new PostulationRequest();

  @ViewChild(DashboardComponent) dashboard!: DashboardComponent;

  constructor(private stageService : StageService) { }

  ngOnInit(): void {
  }

  actions(posId : number, index: number) {
    return '<div id_='+posId+' index_='+index+' class="me-auto d-flex">'+              
              '<button  type_="accepte" class="btn btn-primary me-2 btn-sm" title="Accepte"'+
                'data-bs-toggle="modal" data-bs-target="#addOffre">'+
                '<i class="bi bi-check2-square"></i>'+
              '</button>'+
              '<button type_="refuse" class="btn btn-danger btn-sm" title="Refuse"'+
                ' data-bs-toggle="modal" data-bs-target="#deleteOffre">'+
                '<i class="bi bi-trash3-fill"></i>'+
              '</button>'+
            '</div>';
  }

  getAllPostulation() {
    this.stageService.getAllPostulation().subscribe((res) => {
      this.postulations = res;
      const handleButons = this.handleButons;
      this.postulations.forEach((pos, index) => {
        var dt: Date = new Date(pos.postulationDate);
        var fullName = pos.user.nom + ' ' + pos.user.prenom;
        this.dashboard.setItems([fullName, pos.user.email, pos.offreStage.intitule, dt.toLocaleDateString(), pos.offreStage.diplome_demande, this.actions(pos.id, index)]);
      });
      $('#example tbody').on('click', 'button', function (this: any, event: any) {
        handleButons(this);
      });
    }, (error) => {
      console.error(error);
      
    });
  }

  handleButons = (button: any) => {
    const type = button.getAttribute("type_");
    const id_ = button.parentNode.getAttribute("id_");
    const index_ = button.parentNode.getAttribute("index_");

    if (type === "accepte") {
      this.confirm(id_, 'accepte');
    } else if (type === "refuse") {
      this.confirm(id_, 'refuse');
    }
    
  }

  confirm(posId : number, status : string) {

  }

}
