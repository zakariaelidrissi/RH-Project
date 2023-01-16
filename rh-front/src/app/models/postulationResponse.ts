import { OffreStage } from "./offreStage";
import { User } from "./user";

export class PostulationResponse {
    id : number;
    userId : number;
    OffreStageId : number;
    postulationDate : Date;
    Statut : string;

    user : User;
    offreStage : OffreStage;

    constructor() {
        this.id = 0;
        this.userId = 0;
        this.OffreStageId = 0;
        this.postulationDate = new Date();
        this.Statut = '';
        this.user = new User();
        this.offreStage = new OffreStage();
    }
}