export class File {
    id?: number;
    name?: string;
    data?: Uint8Array;
    constructor(name: string, data: Uint8Array) {
        this.name = name;
        this.data = data;
    }
}