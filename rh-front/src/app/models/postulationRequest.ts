import { User } from "./user";

export class PostulationRequest {
    id : number;
    userId : number;
    OffreStageId : number;
    postulationDate : Date;
    Statut : string;

    constructor() {
        this.id = 0;
        this.userId = 0;
        this.OffreStageId = 0;
        this.postulationDate = new Date();
        this.Statut = '';
    }
}