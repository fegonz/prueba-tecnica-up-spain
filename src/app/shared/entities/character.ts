import { Origin, Location } from "./";


export class Character {
    id!: number;
    name!: string;
    status!: string;
    species!: string;
    type!: string;
    gender!: string;
    origin!: Origin;
    location!: Location;
    image!: string;
    episode!: string[];
    url!: string;
    created!: string;
}