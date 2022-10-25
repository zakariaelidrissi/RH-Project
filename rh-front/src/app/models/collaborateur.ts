import { Demande } from "./Demande";
import { Employe } from "./employe";
import { FormationResponse } from "./formationResponse";
import { PlanRequest } from "./planRequest";

export class Collaborateur {
    id: number;    
    formations: Array<FormationResponse>;
    plans: Array<PlanRequest>;
    demandes: Array<Demande>;
    empolyeID: number;
    employe: Employe;

    constructor() {
        this.id = 0;    
        this.formations = new Array<FormationResponse>();
        this.plans = new Array<PlanRequest>();
        this.demandes = new Array<Demande>();
        this.empolyeID = 0;
        this.employe = new Employe();
    }
}