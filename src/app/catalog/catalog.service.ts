import { Injectable, OnInit } from '@angular/core';
import { ProjectService } from './service/project.service';
import { CouncilService } from './service/council.service';
import { CategoryService } from './service/category.service';
import { BoardingTypeService } from './service/boardingtype.service';
import { BoardingPointsService } from './service/boardingpoints.service';
import { DropPointsService } from './service/droppoints.service';
import { ProjectInfo } from './model/projectinfo';
import { CouncilInfo } from './model/councilinfo';
import { CategoryInfo } from './model/categoryinfo';
import { BoardingType } from './model/boardingtype';
import { BoardingPoints } from './model/boardingpoints';
import { DropPoints } from './model/droppoints';

@Injectable({
  providedIn: 'root'
})
export class CatalogService implements OnInit {

  projects: ProjectInfo[]=[];
  councils: CouncilInfo[]=[];
  categories: CategoryInfo[]=[];
  boardingTypes: BoardingType[]=[];
  boardingPoints: BoardingPoints[]=[];
  dropPoints: DropPoints[]=[];
  categoryName: string;

  constructor(private projectService: ProjectService,
              private councilService: CouncilService,
              private categoryService: CategoryService,
              private boardingTypeService: BoardingTypeService,
              private boardingPointsService: BoardingPointsService,
              private dropPointsService: DropPointsService) { }
  
  ngOnInit(){
  }

  getProjects(){
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

  getCouncils(){
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
  }

  getBoardingTypes(){
    this.boardingTypeService.getBoardingTypes().subscribe(
      (result: any) => {
        result.forEach(element => {
          console.log('Boarding Type element: ', element);
          this.boardingTypes.push({
            name : element.name,
            id: element.id
          });
        });
      },
      (error: any) => {
        console.log('Error occured while retrieving all boarding types');
      }
    );
  }

  getBoardingPoints(locationId:number){
    this.boardingPointsService.getBoardingPoints(locationId).subscribe(
      (result: any) => {
        result.forEach(element => {
          console.log('Boarding Point element: ', element);
          this.boardingPoints.push({
            name : element.name,
            id: element.id,
            locationId: element.locationId
          });
        });
      },
      (error: any) => {
        console.log('Error occured while retrieving all boarding points');
      }
    );
  }

  getDropPoints(locationId:number){
    this.dropPointsService.getDropPoints(locationId).subscribe(
      (result: any) => {
        result.forEach(element => {
          console.log('Drop Point element: ', element);
          this.dropPoints.push({
            name : element.name,
            id: element.id,
            locationId: element.locationId
          });
        });
      },
      (error: any) => {
        console.log('Error occured while retrieving all drop points');
      }
    );
  }
  
  getProjectCategory(projectId:number){
    this.categoryService.getCategoryByProject(projectId).subscribe(
      (result: any) => {
        result.forEach(element => {
          console.log('category element: ', element);
          this.categories.push({
            name : element.name,
            id: element.id,
            projectId: element.projectId
          });
        });
        console.log('Retrieved all categories');
      },
      (error: any) => {
        console.log('Error occured while retrieving all categories');
        return {};
      }
    );
  }

  getCategoryName(projectId: number, categoryId: number){
    this.categoryService.getCategoryName(projectId, categoryId).subscribe(
      (result: any) => {
        console.log('Category Name: ', result);
        this.categoryName= result;
      },
      (error: any) => {
        console.log('Error occured while retrieving category name');
      }
    );
  }
}
