export class StagiaireRequest {
    id : number;
    civilite : string;
    niveau_etudes : string;
    ville: string;
    telephone : string;
    cv : string;
    LinkedIn_URL : string;
    userId : number;

    constructor() {
        this.id = 0;
        this.civilite = '';
        this.niveau_etudes = '';
        this.ville = '';
        this.telephone = '';
        this.cv = '';
        this.LinkedIn_URL = '';
        this.userId = 0;    
    }

}