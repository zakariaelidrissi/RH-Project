// import { Formation } from "./formationRequest";

import { Employe } from "./employe";

export class PlanResponse {

    id: number;
    name: string;
    // name: string;
    planDate: string;
    responsable: Employe;
    // formation: Array<Formation>;

    constructor() {
        this.id = 0;
        this.name = '';
        this.planDate = '';
        this.responsable = new Employe();
        // this.formation = new Array<Formation>();
    }
}