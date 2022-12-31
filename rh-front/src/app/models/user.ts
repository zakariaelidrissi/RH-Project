export class User {
    id: number;
    cin: string;
    genre: string;
    nom: string;
    prenom: string;
    dateNaissance: Date;
    email: string;
    motDePasse: string;
    tel: string;
    userRole: string;

    constructor() {
        this.id = 0;
        this.cin = '';
        this.genre = ''
        this.nom = '';
        this.prenom = '';
        this.dateNaissance = new Date();
        this.email = '';
        this.motDePasse = '';
        this.tel = '';
        this.userRole = '';
    }
}