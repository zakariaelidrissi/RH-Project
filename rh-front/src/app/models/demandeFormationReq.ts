export class DemandeFormationReq {
    id : number;
    // demandeDate? : string;
    // collaborateurId? : number;
    // formationId? : number;
    status : string;

    constructor() {
        this.id = 0;
        this.status = '';
    }
}