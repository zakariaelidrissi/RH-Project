import { User } from "./user";

export class Stagiaire {
    id: number;
    civilite: string;
    niveau_etudes: string;
    ville: string;
    telephone: string;
    cvData : any;
    LinkedIn_URL: string;
    userId: number;
    user: User;

    constructor() {
        this.id = 0;
        this.civilite = '';
        this.niveau_etudes = '';
        this.ville = '';
        this.telephone = '';
        // this.cv = '';
        this.LinkedIn_URL = '';
        this.userId = 0;
        this.user = new User();
    }
}