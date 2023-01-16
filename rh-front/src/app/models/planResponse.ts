// import { Formation } from "./formationRequest";

import { Employe } from "./employe";

export class PlanResponse {

    id: number;
    name: string;
    planDate: string;
    employe_id : number;
    responsable: Employe;

    constructor() {
        this.id = 0;
        this.name = '';
        this.planDate = '';
        this.employe_id = 0;
        this.responsable = new Employe();
    }
}