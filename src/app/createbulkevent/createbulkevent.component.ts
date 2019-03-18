import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { EventService } from '../service/event.service';
import { LocationService } from '../service/location.service';
import { ProjectService } from '../service/project.service';
import { BeneficiaryService } from '../service/beneficiary.service';
import { CouncilService } from '../service/council.service';
import { CategoryService } from '../service/category.service';
import { BoardingTypeService } from '../service/boardingtype.service';

@Component({
  selector: 'app-createbulkevent',
  templateUrl: './createbulkevent.component.html',
  styleUrls: ['./createbulkevent.component.css']
})
export class CreatebulkeventComponent implements OnInit {

  failure:boolean=false;
  uploadedFiles:number=0;
  arrayBuffer:any;
  file:File;
  events : any[]=[];
  locations:any[]=[];
  projects:any[]=[];
  beneficiaries:any[]=[];
  councils:any[]=[];
  categories:any[]=[];
  boardingTypes:any[]=[];
  boardingPoints:any[]=[];
  dropPoints:any[]=[];
  locationId:number;
  projectId:number;
  beneficiaryId:number;
  councilId:number;
  categoryId:number;
  boardingTypeId:number;


  incomingfile(event) 
    {
    this.file= event.target.files[0]; 
    }
  constructor(private eventService: EventService,
              private locationService: LocationService,
              private projectService: ProjectService,
              private beneficiaryService: BeneficiaryService,
              private councilService: CouncilService,
              private categoryService: CategoryService,
              private boardingTypeService: BoardingTypeService) { }

  ngOnInit() {
    this.locationService.getAllLocations().subscribe(
      (result: any) => {
        console.log('Retrieved location details');
        result.forEach(element => {
          var locationInfo = {
            id: element.id,
            name: element.name,
            state: element.state,
            country: element.country
          };
          this.locations.push(locationInfo);
        });
      },
      (error: any) => {
        console.log('Error while retrieving locations');
      }
    );
    this.projectService.getAllProjects().subscribe(
      (result: any) => {
        console.log('Retrieved project details');
        result.forEach(element => {
          var projectInfo = {
            id: element.id,
            name: element.name
          };
          this.projects.push(projectInfo);
        });
      },
      (error: any) => {
        console.log('Error while retrieving projects');
      }
    );
    this.boardingTypeService.getBoardingTypes().subscribe(
      (result: any) => {
        console.log('Retrieved boarding types');
        result.forEach(element => {
          var boardingType = {
            id: element.id,
            name: element.name
          };
          this.boardingTypes.push(boardingType);
        });
      },
      (error: any) => {
        console.log('Error while retrieving boarding types');
      }
    );
  }

  loadLocationDetails(locationId){
    this.beneficiaryService.getBeneficiaries(locationId).subscribe(
      (result: any) => {
        console.log('Retrieved Beneficiaries');
        result.forEach(element => {
          var beneficiaryInfo = {
            id: element.id,
            name: element.name,
            locationId: element.locationId
          };
          this.beneficiaries.push(beneficiaryInfo);
        });
      },
      (error: any) => {
        console.log('Error while retrieving Beneficiaries');
      }
    );
    this.councilService.getCouncilByLocation(locationId).subscribe(
      (result: any) => {
        console.log('Retrieved council info');
        result.forEach(element => {
          var councilInfo = {
            id: element.id,
            name: element.name,
            locationId: element.locationId
          };
          this.councils.push(councilInfo);
        });
      },
      (error: any) => {
        console.log('Error while retrieving council info');
      }
    );
  }

  loadCategories(projectId){
    this.categoryService.getCategoryByProject(projectId).subscribe(
      (result: any) => {
        console.log('Retrieved Categories');
        result.forEach(element => {
          var categoryInfo = {
            id: element.id,
            name: element.name,
            projectId: element.projectId
          };
          this.categories.push(categoryInfo);
        });
      },
      (error: any) => {
        console.log('Error while retrieving categories');
      }
    );
  }

  findLocationId(name:string){
    for(var location of this.locations){
      if(location['name'] == name){
        this.locationId = location['id'];
        break
      }
    }
  }

  findProjectId(name:string){
    for(var project of this.projects){
      if(project.name == name){
        this.projectId = project.id;
        break
      }
    }
  }

  findBeneficiaryId(name:string){
    console.log('Beneficiary name: ',name);
    for(var beneficiary of this.beneficiaries){
      if(beneficiary.name == name){
        console.log('Beneficiary name found');
        this.beneficiaryId = beneficiary.id;
        break
      }
    }
  }

  findCouncilId(name:string){
    for(var council of this.councils){
      if(council.name == name){
        console.log('Council name found');
        this.councilId = council.id;
        break
      }
    }
  }

  findCategoryId(name:string){
    var counter =-1;
    for(var category of this.categories){
      counter++;
      if(category.name == name){
        console.log('Category name found');
        this.councilId = counter;
        break
      }
    }
  }

  findBoardingTypeId(name:string){
   for(var boardingType of this.boardingTypes){
      if(boardingType.name == name){
        console.log('Boarding Type found');
        this.boardingTypeId = boardingType.id;
        break
      }
    }
  }

  Upload() {
    let fileReader = new FileReader();
      fileReader.onload = (e) => {
        
          this.arrayBuffer = fileReader.result;
          var data = new Uint8Array(this.arrayBuffer);
          var arr = new Array();
          for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
          var bstr = arr.join("");
          var workbook = XLSX.read(bstr, {type:"binary"});
          var first_sheet_name = workbook.SheetNames[0];
          var worksheet = workbook.Sheets[first_sheet_name];
          var excelData:any = XLSX.utils.sheet_to_json(worksheet,{raw:true});
          excelData.forEach(element => {
            this.locationId=1;
            this.loadLocationDetails(this.locationId);
            this.findBeneficiaryId(element['Beneficiary Name']);
            this.findCouncilId(element['Council Name']);
            this.findProjectId(element['Project']);
            this.loadCategories(this.projectId);
            this.findCategoryId(element['Event Category']);
            this.findBoardingTypeId(element['Transport Boarding Type']);
            console.log('Event Date from excel: ',element['Date in dd-mmm-yy']);
            var startDate = new Date(element['Date in dd-mmm-yy'],element['Start Time']);
            var endDate = new Date(element['Date in dd-mmm-yy'],element['End Time']);
            var eventInfo={
              beneficiaryId : this.beneficiaryId,
              councilId: this.councilId,
              projectId: this.projectId,
              categoryId: this.categoryId,
              title: element['Event Title'],
              description: element['Event Description'],
              startTime: startDate.getTime(),
              endTime: endDate.getTime(),
              volunteers: element['Volunteers Required'],
              pocId: element['POC ID'],
              locationId: this.locationId,
              boardingTypeId: this.boardingTypeId,
              boardingPoints: element['Transport Boarding Points'],
              dropPoints: element['Transport Drop Point'],
              createdBy: '200816'
            };
            this.events.push(eventInfo);
          });
          console.log('events: ',this.events);
          /*this.eventService.saveBulkEvents(this.events).subscribe(
            (result: any) => {
              result.forEach(element => {
                var eventInfo = {
                  id: result.id,
                  name: result.title
                };
                console.log('Event saved: ', eventInfo);
              }); 
            }
          );*/
          //console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
          this.uploadedFiles = XLSX.utils.sheet_to_json(worksheet,{raw:true}).length;
      }
      if(null != this.file && this.file.size>0){
        fileReader.readAsArrayBuffer(this.file);
        this.failure = false;
        return true;
      }else{
        this.failure = true;
      }
}

  readfile() {
    // You can change the file path in the assets folder
    let url = "/assets/template.xlsx";
    let req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.responseType = "arraybuffer";
    req.onload =  (e) => {
        let data = new Uint8Array(req.response);
        let workbook = XLSX.read(data, {type: "array"});
        const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
        // TO export the excel file
        console.log(excelBuffer);
    };
    req.send();
  }
}
