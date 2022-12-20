import { Collaborateur } from "./collaborateur";
import { FormationResponse } from "./formationResponse";


export class DemandeFormationRes {
    id : number;
    demandeDate : Date;
    collaborateur : Collaborateur;
    formation : FormationResponse;
    status : string;

    constructor() {
        this.id = 0;
        this.demandeDate = new Date();
        this.collaborateur = new Collaborateur();
        this.formation = new FormationResponse();
        this.status = '';
    }
}