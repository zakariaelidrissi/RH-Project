export class OffreStage {
    id : number;
    intitule : string;
    type_stage : string;
    duree_stage_mois : number;
    date_debut_stage : Date;
    remuneration : boolean;
    diplome_demande : string;
    descriptif_mission : string;

    constructor() {
        this.id = 0;
        this.intitule = '';
        this.type_stage = '';
        this.duree_stage_mois = 4;
        this.date_debut_stage = new Date();
        this.remuneration = false;
        this.diplome_demande = '';
        this.descriptif_mission = '';
    }
}