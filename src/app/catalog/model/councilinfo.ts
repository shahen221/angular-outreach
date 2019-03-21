export class CouncilInfo{
    name: string;
    id: number;
    locationId: number;

    constructor(name: string, id: number, locationId: number){
        this.name = name;
        this.id = id;
        this.locationId = locationId;
    }
}