export class User {
    id: number;
    genre: string;
    nom: string;
    prenom: string;
    email: string;
    motDePasse: string;
    tel: string;
    userRole: string;
    emailVerified: boolean;
    verificationCode: string;    

    constructor(){
        this.id = 0;
        this.genre = ''
        this.nom = '';
        this.prenom = '';
        this.email = '';
        this.motDePasse = '';
        this.tel = '';
        this.userRole = '';
        this.emailVerified = false;
        this.verificationCode = ''
    }
}