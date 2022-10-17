export class AbsenceStgRequest {
    id : number;
    dateAbs : Date;
    natureAbsence : string;
    justificatif : boolean;
    duree : string;
    stagiaireId : number;

    constructor(){
        this.id = 0;
        this.dateAbs = new Date();
        this.natureAbsence = '';
        this.justificatif = false;
        this.duree = '';
        this.stagiaireId = 0;
    }
}