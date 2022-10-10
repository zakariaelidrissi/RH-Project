import { Collaborateur } from "./collaborateur";
import { Formation } from "./formation";

export class PlanResponse {
    id: number;
    name: string;
    planDate: string;
    responsable: Collaborateur;
    formation: Array<Formation>;

    constructor() {
        this.id = 0;
        this.name = '';
        this.planDate = '';
        this.responsable = new Collaborateur();
        this.formation = new Array<Formation>();
    }
}