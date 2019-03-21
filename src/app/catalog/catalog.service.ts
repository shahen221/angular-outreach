import { Injectable, OnInit } from '@angular/core';
import { ProjectService } from './service/project.service';
import { CouncilService } from './service/council.service';
import { CategoryService } from './service/category.service';
import { ProjectInfo } from './model/projectinfo';
import { CouncilInfo } from './model/councilinfo';
import { CategoryInfo } from './model/categoryinfo';

@Injectable({
  providedIn: 'root'
})
export class CatalogService implements OnInit {

  projects: ProjectInfo[]=[];
  councils: CouncilInfo[]=[];
  categories: CategoryInfo[]=[];
  categoryName: string;

  constructor(private projectService: ProjectService,
              private councilService: CouncilService,
              private categoryService: CategoryService) { }
  
  ngOnInit(){
  }

  getCatalogs(){
    console.log('Inside CatalogService::getCatalogs() ');
    this.getProjects();
    this.getCouncils();
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
