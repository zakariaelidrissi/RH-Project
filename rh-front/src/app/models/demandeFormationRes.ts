import { Employe } from "./employe";
import { FormationResponse } from "./formationResponse";


export class DemandeFormationRes {
    id: number;
    demandeDate: Date;
    employe: Employe;
    formation: FormationResponse;
    status: string;

    constructor() {
        this.id = 0;
        this.demandeDate = new Date();
        this.employe = new Employe();
        this.formation = new FormationResponse();
        this.status = '';
    }
}