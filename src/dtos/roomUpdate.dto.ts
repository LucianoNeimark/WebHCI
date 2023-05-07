import type { Room } from '@/interfaces/room.interface'

export class RoomUpdateDTO {
    name: string;
    meta: any; 

    constructor(room : Room) {
        this.name = room.name;
        this.meta = room.meta;
    }
}