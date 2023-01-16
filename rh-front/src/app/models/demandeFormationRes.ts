import { Employe } from "./employe";
import { FormationResponse } from "./formationResponse";


export class DemandeFormationRes {
    id: number;
    dateDemande: Date;
    employeId: number;
    formationId: number;
    status: string;
    employe: Employe;
    formation: FormationResponse;

    constructor() {
        this.id = 0;
        this.dateDemande = new Date();
        this.employeId = 0;
        this.formationId = 0;
        this.status = '';
        this.employe = new Employe();
        this.formation = new FormationResponse();
    }
}