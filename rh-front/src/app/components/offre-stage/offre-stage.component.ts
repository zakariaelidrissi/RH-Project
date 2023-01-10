import { Component, OnInit, ViewChild } from '@angular/core';
import { OffreStage } from 'src/app/models/offreStage';
import { StageService } from 'src/app/services/offre-stage/stage.service';
import { DashboardComponent } from '../dashboard/dashboard.component';

declare const $: any;

@Component({
  selector: 'app-offre-stage',
  templateUrl: './offre-stage.component.html',
  styleUrls: ['./offre-stage.component.css']
})
export class OffreStageComponent implements OnInit {

  case: string = 'add';
  message: string = '';
  stages : OffreStage[] = [];
  newOffre : OffreStage = new OffreStage();
  index : number = 0;
  OffreID : number = 0;

  @ViewChild(DashboardComponent) dashboard!: DashboardComponent;

  constructor(private stageService : StageService) { }

  ngOnInit(): void {
    this.getStages();
  }

  actions(offreId : number, index: number) {
    return '<div id_='+offreId+' index_='+index+' class="me-auto d-flex">'+              
              '<button  type_="editOffre" class="btn btn-primary me-2 btn-sm" title="Update un offre de stage"'+
                'data-bs-toggle="modal" data-bs-target="#addOffre">'+
                '<i class="bi bi-pencil-square"></i>'+
              '</button>'+
              '<button type_="confirmDeleteOffre" class="btn btn-danger btn-sm" title="supprimer un offre de stage"'+
                ' data-bs-toggle="modal" data-bs-target="#deleteOffre">'+
                '<i class="bi bi-trash3-fill"></i>'+
              '</button>'+
            '</div>';
  }

  getStages() {
    this.stageService.getAllStages().subscribe((res) => {
      this.stages = res;
      const handleButons = this.handleButons;
      this.stages.forEach((stg, index) => {
        var dt: Date = new Date(stg.date_debut_stage);
        var desc : string = stg.descriptif_mission.slice(0,20)+'...';
        // console.log(index);
        this.dashboard.setItems([stg.intitule, stg.type_stage, stg.duree_stage_mois.toString(), dt.toLocaleDateString(), stg.remuneration.toString(), stg.diplome_demande, desc, this.actions(stg.id, index)]);
      });
      $('#example tbody').on('click', 'button', function (this: any, event: any) {
        handleButons(this);
      });
      console.log(res);
    }, (error) => {
      console.log(error);
    });
  }

  handleButons = (button: any) => {
    const type = button.getAttribute("type_");
    const id_ = button.parentNode.getAttribute("id_");
    const index_ = button.parentNode.getAttribute("index_");

    if (type === "confirmDeleteOffre") {
      this.confirmDeleteOffre(id_, index_);
    } else if (type === "editOffre") {
      this.editOffre(this.stages.find(s => s.id == id_) as OffreStage, index_);
    }
    
  }

  onAdd() {
    this.case = 'add';
    this.cleanData();
  }

  addOffre() {
    this.stageService.addOffreStage(this.newOffre).subscribe((res) => {
      this.message = 'Success!';
      $('#addOffre').modal('hide');
      this.dashboard.clear();
      this.getStages();
      this.cleanData();
    }, (error) => {
      console.log(error);
    });
  }

  editOffre = (offre: OffreStage, index: number) => {
    this.newOffre = offre;
    this.index = index;
    this.case = 'update';
  }

  updateOffre() {
    this.stageService.updateStage(this.newOffre).subscribe((response) => {
      this.message = "successfuly!";
      $('#addOffre').modal("hide");
      this.dashboard.clear();
      this.getStages();
    }, err => {
      console.log(err);
    });
  }

  confirmDeleteOffre(offreId: number, i: number) {
    this.OffreID = offreId;
    this.index = i;
  }

  deleteOffre(offreId: number, index: number) {
    this.stageService.delateStage(offreId).subscribe((response) => {
      this.message = "This Formation well be deleted successfuly!";
      this.stages.splice(index, 1);
      this.dashboard.clear();
      this.getStages();
      $('#deleteFormation').modal("hide");
    }, err => {
      console.log(err);
    });
  }

  cleanData() {
    this.newOffre.intitule = '';
    this.newOffre.descriptif_mission = '';
    this.newOffre.id = 0;
    this.newOffre.diplome_demande = '';
    this.newOffre.date_debut_stage = new Date();
    this.newOffre.remuneration = false;
    this.newOffre.type_stage = '';
    this.newOffre.duree_stage_mois = 1;    
  }

}
