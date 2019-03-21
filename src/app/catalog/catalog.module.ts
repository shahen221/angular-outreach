import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogService } from './catalog.service';
import { CouncilService } from './service/council.service';
import { ProjectService } from './service/project.service';
import { CategoryService } from './service/category.service';
import { LocationService } from './service/location.service';
import { BeneficiaryService } from './service/beneficiary.service';
import { BoardingTypeService } from './service/boardingtype.service';
import { BusinessUnitService } from './service/businessunit.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [CatalogService,
              CouncilService,
              ProjectService,
              CategoryService,
              LocationService,
              BeneficiaryService,
              BoardingTypeService,
              BusinessUnitService],
  exports: []
})
export class CatalogModule { }
