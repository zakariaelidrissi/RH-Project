import { Demande } from "./Demande";
import { Employe } from "./employe";
import { Formation } from "./formation";
import { PlanRequest } from "./planRequest";
import { User } from "./user";

export class Collaborateur {
    id: number;    
    formations: Array<Formation>;
    plans: Array<PlanRequest>;
    demandes: Array<Demande>;
    empolyeID: number;
    employe: Employe;

    constructor() {
        this.id = 0;    
        this.formations = new Array<Formation>();
        this.plans = new Array<PlanRequest>();
        this.demandes = new Array<Demande>();
        this.empolyeID = 0;
        this.employe = new Employe();
    }
}