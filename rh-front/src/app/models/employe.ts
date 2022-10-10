export class Employe {
    id : number;
    nom : string;
    cin : string;
    email : string;
    naissance : Date;
    debutAmbauche : Date;
    departement : string;
    poste : string;


    constructor(){
        this.id = 0;
        this.nom = '';
        this.cin = '';
        this.email = '';
        this.naissance = new Date();
        this.debutAmbauche = new Date();
        this.departement = '';
        this.poste = '';
    }
}