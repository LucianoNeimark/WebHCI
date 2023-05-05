export class DeviceCreationDTO {
    type: { 
        id: string;
    };
    name: string;

    constructor(typeId: string, name: string) {
        this.type = { id: typeId };
        this.name = name;
    }
}