import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pmo-page',
  templateUrl: './pmo-page.component.html',
  styleUrls: ['./pmo-page.component.css']
})
export class PmoPageComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => console.log(params)); // Object {}
  }

  ngOnInit() {
  }

}
