export class RoomCreationDTO {
    name: string;
    meta: any; 

    constructor(name: string) {
        this.name = name;
        this.meta = { };
    }
}