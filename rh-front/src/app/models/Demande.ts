import { Collaborateur } from "./collaborateur";
import { FormationResponse } from "./formationResponse";


export class Demande {
    id: number;
    demandeDate: string;
    collaborateur: Collaborateur;
    formation: FormationResponse;

    constructor() {
        this.id = 0;
        this.demandeDate = '';
        this.collaborateur = new Collaborateur();
        this.formation = new FormationResponse();
    }
}