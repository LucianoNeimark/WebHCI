export class DeviceCreationDTO {
    type: { 
        id: string;
    };
    name: string;
    meta: {
        qtyUses: number;
    };

    constructor(typeId: string, name: string) {
        this.type = { id: typeId };
        this.name = name;
        this.meta = { qtyUses: 0 };
    }
}