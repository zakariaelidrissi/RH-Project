import { Component, OnInit } from '@angular/core';
import { OffreStage } from 'src/app/models/offreStage';
import { StageService } from 'src/app/services/offre-stage/stage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  stages : OffreStage[] = [];
  stage : OffreStage = new OffreStage();

  constructor(private offresStgService : StageService) { }

  ngOnInit(): void {
    this.getAllStages();
  }

  getAllStages() {
    this.offresStgService.getAllStages().subscribe((res) => {
      this.stages = res;
    }, (error) => {
      console.log(error);
    });
  }

  showMore(stage : OffreStage){
    this.stage = stage;
  }

}
