// import { DemandeFormation } from "./Demande";
import { DemandeFormationRes } from "./demandeFormationRes";
import { Employe } from "./employe";
import { FormationResponse } from "./formationResponse";
import { PlanRequest } from "./planRequest";

export class Collaborateurs {
    id: number;
    formations: Array<FormationResponse>;
    plans: Array<PlanRequest>;
    demandes: Array<DemandeFormationRes>;
    empolyeID: number;
    employe: Employe;

    constructor() {
        this.id = 0;
        this.formations = new Array<FormationResponse>();
        this.plans = new Array<PlanRequest>();
        this.demandes = new Array<DemandeFormationRes>();
        this.empolyeID = 0;
        this.employe = new Employe();
    }
}