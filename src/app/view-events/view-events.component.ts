import { Component, OnInit, Input } from '@angular/core';
import * as XLSX from 'xlsx';
import {saveAs} from 'file-saver';
import { EventService } from '../service/event.service';
import { EventInfo } from '../model/eventinfo';
import { CouncilService } from '../service/council.service';
import { CouncilInfo } from '../model/councilinfo';
import { ProjectInfo } from '../model/projectinfo';
import { CategoryInfo } from '../model/categoryinfo';
import { ProjectService } from '../service/project.service';
import { CategoryService } from '../service/category.service';
import { LoginService } from '../service/login.service';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Component({
  selector: 'app-view-events',
  templateUrl: './view-events.component.html',
  styleUrls: ['./view-events.component.css']
})
export class ViewEventsComponent implements OnInit {
 
  @Input() page:String;
  data: any = [{
    eid: 'e101',
    ename: 'ravi',
    esal: 1000
  },
  {
    eid: 'e102',
    ename: 'ram',
    esal: 2000
  },
  {
    eid: 'e103',
    ename: 'rajesh',
    esal: 3000
  }];
  eventInfos : EventInfo[] = [];
  councils: CouncilInfo[] = [];g
  projects: ProjectInfo[]= [];
  categories: CategoryInfo[] = [];
  userAdmin: boolean;
  userAssociate: boolean;
 
  constructor(private eventService : EventService, 
              private councilService : CouncilService,
              private projectService: ProjectService,
              private categoryService: CategoryService,
              private loginService: LoginService) { }

  ngOnInit() {
    var userRole = this.loginService.getUserRole();
    console.log('Inside View Events Component, user role: ', userRole);
    if(userRole == 'Admin'){
      this.userAdmin = true;
    }else if(userRole == 'Associate'){
      this.userAssociate = true;
    }
    this.eventService.getAllEvents().subscribe(
      (result : any) => {
        result.forEach(element => {
          console.log('element: ', element);
          var eventInfo: EventInfo = {
            id: element.id,
            beneficiaryId: element.beneficiaryId,
            councilId: element.councilId,
            projectId: element.projectId,
            categoryId: element.categoryId,
            name : element.title,
            desc: element.description,
            startTime: element.startTime,
            endTime: element.endTime,
            status: element.status,
            volunteers: element.volunteers,
            pocId: element.pocId,
            pocContactNo: element.pocContactNo,
            locationId: element.locationId,
            venueAddress: element.venueAddress,
            boardingTypeId: element.boardingTypeId,
            boardingPoints: element.boardingPoints,
            dropPoints: element.dropPoints,
            updatedBy: element.updatedBy,
            favorite: element.favorite
          };
          console.log('eventInfo : ',eventInfo);
          this.eventInfos.push(eventInfo);
        });
      },
      (error : any) => {
        console.log('Error occured while retrieving all events');
      }
    );
    this.councilService.getAllCouncils().subscribe(
      (result: any) => {
        result.forEach(element => {
          console.log('council element: ', element);
          this.councils.push({
            name : element.name,
            id: element.id,
            locationId: element.locationId
          });
        });
      },
      (error: any) => {
        console.log('Error occured while retrieving all councils');
      }
    );
    this.projectService.getAllProjects().subscribe(
      (result: any) => {
        result.forEach(element => {
          console.log('project element: ', element);
          this.projects.push({
            name : element.name,
            id: element.id
          });
        });
      },
      (error: any) => {
        console.log('Error occured while retrieving all projects');
      }
    );
    
  }

  getCouncilName(councilId: number):CouncilInfo{
    return this.councils[councilId-1];
  }

  getProjectName(projectId: number): ProjectInfo{
    return this.projects[projectId-1];
  }

  getCategoryName(projectId: number, categoryId: number):CategoryInfo{
    return this.categoryService.getCategoryByProject(projectId).subscribe(
      (result: any) => {
        result.forEach(element => {
          console.log('category element: ', element);
          this.categories.push({
            name : element.name,
            id: element.id,
            projectId: element.projectId
          });
        });
        return this.categories[categoryId-1];
      },
      (error: any) => {
        console.log('Error occured while retrieving all categories');
        return {};
      }
    );
  }
  
  Download(){
    this.exportAsExcelFile(this.data,'Sample');
  }
  
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log('worksheet',worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    console.log(excelBuffer);
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
  
}
