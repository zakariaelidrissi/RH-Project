export class AbsenceStgRequest {
    id : number;
    dateAbs : Date;
    natureAbsence : string;
    justificatif : string;
    duree : string;
    stagiaireId : number;

    constructor(){
        this.id = 0;
        this.dateAbs = new Date();
        this.natureAbsence = '';
        this.justificatif = '';
        this.duree = '';
        this.stagiaireId = 0;
    }
}