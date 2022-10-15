
export class FormationRequest {
    id: number;
    name: string;
    objectif: string;
    duree: string;
    formationDate: Date;
    // collaborateurs: Set<Collaborateur>;
    // plan: Set<Plan>;
    // demandes: Array<Demande>;

    constructor() {
        this.id = 0;
        this.name = '';
        this.objectif = '';
        this.duree = '';
        this.formationDate = new Date();
        // this.collaborateurs = new Set<Collaborateur>();
        // this.plan = new Set<Plan>();
        // this.demandes = new Array<Demande>();
    }
}