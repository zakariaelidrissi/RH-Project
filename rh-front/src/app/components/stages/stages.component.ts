import { Component, OnInit } from '@angular/core';
import { OffreStage } from 'src/app/models/offreStage';
import { StageService } from 'src/app/services/offre-stage/stage.service';

@Component({
  selector: 'app-stages',
  templateUrl: './stages.component.html',
  styleUrls: ['./stages.component.css']
})
export class StagesComponent implements OnInit {

  page: number = 1;
  count: number = 0;
  pageSize : number = 8;
  pageSizes : any = [5, 10, 15, 20, 30]

  stages : OffreStage[] = [];

  constructor(private stageService : StageService) { }

  ngOnInit(): void {
    this.getAllStages();
  }

  getAllStages() {
    this.stageService.getAllStages().subscribe((res) => {
      this.stages = res;
      console.log(res);
    }, (error) => {
      console.log(error);
    })
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.stages;
  }

}
