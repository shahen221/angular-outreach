export class LocationInfo{
    id: number;
    name: string;
    state: string;
    country: string;

    constructor(id: number, name: string, state: string, country: string){
        this.id = id;
        this.name = name;
        this.state = state;
        this.country = country;
    }
}