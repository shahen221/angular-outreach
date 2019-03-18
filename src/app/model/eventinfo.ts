export class EventInfo {
    name : string;
    councilId: string;
    projectId: string;
    categoryId: string;

    constructor(name : string, councilId: string, projectId: string, categoryId: string){
        this.name = name;
        this.councilId = councilId;
        this.projectId = projectId;
        this.categoryId = categoryId;
    }
}