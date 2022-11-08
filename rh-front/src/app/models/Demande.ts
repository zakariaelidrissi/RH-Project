import { Collaborateur } from "./collaborateur";
import { FormationResponse } from "./formationResponse";


export class Demande {
    id ?: number;
    demandeDate ?: string;
    collaborateur ?: Collaborateur;
    formation ?: FormationResponse;
    
}