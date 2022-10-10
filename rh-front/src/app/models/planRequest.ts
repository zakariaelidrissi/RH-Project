
export class PlanRequest {
    id: number;
    name: string;
    planDate: string;
    responsableID: number;

    constructor() {
        this.id = 0;
        this.name = '';
        this.planDate = '';
        this.responsableID = 0;
    }
}