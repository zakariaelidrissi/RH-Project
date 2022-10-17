export class Stagiaire {
    id : number;
    nom : string;
    cin : string;
    email: string;
    naissance : Date;
    dateDebut : Date;
    departement : string;
    poste : string;

    constructor() {
        this.id = 0;
        this.nom = '';
        this.cin = '';
        this.email = '';
        this.naissance = new Date();
        this.dateDebut = new Date();
        this.departement = '';
        this.poste = '';
    }
}