export class EventInfo {
    id: string;
    beneficiaryId: string;
    councilId: string;
    projectId: string;
    categoryId: string;
    name : string;
    desc: string;
    startTime: string;
    endTime: string;
    status: string;
    volunteers: string;
    pocId: string;
    pocContactNo: string;
    locationId: string;
    venueAddress: string;
    boardingTypeId: string;
    boardingPoints: string;
    dropPoints: string;
    updatedBy: string;
    favorite: CharacterData;

    constructor(
        id: string,
        beneficiaryId: string,
        councilId: string,
        projectId: string,
        categoryId: string,
        name : string,
        desc: string,
        startTime: string,
        endTime: string,
        status: string,
        volunteers: string,
        pocId: string,
        pocContactNo: string,
        locationId: string,
        venueAddress: string,
        boardingTypeId: string,
        boardingPoints: string,
        dropPoints: string,
        updatedBy: string,
        favorite: CharacterData){
        this.id = id;
        this.beneficiaryId = beneficiaryId;
        this.councilId = councilId;
        this.projectId = projectId;
        this.categoryId = categoryId;
        this.name = name;
        this.desc= desc;
        this.startTime= startTime;
        this.endTime = endTime;
        this.status = status;
        this.volunteers = volunteers;
        this.pocId = pocId;
        this.pocContactNo = pocContactNo;
        this.locationId = locationId;
        this.venueAddress = venueAddress;
        this.boardingTypeId = boardingTypeId;
        this.boardingPoints = boardingPoints;
        this.dropPoints = dropPoints;
        this.updatedBy = updatedBy;
        this.favorite = favorite;
    }
}