export class User {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    password: string;
    phone: string;
    role: string;

    constructor(){
        this.id = 0;
        this.nom = '';
        this.prenom = '';
        this.email = '';
        this.password = '';
        this.phone = '';
        this.role = '';
    }
}