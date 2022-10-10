import { Collaborateur } from "./collaborateur";
import { Formation } from "./formation";

export class Demande {
    id: number;
    demandeDate: string;
    collaborateur: Collaborateur;
    formation: Formation;

    constructor() {
        this.id = 0;
        this.demandeDate = '';
        this.collaborateur = new Collaborateur();
        this.formation = new Formation();
    }
}