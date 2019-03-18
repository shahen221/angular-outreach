import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-poc-page',
  templateUrl: './poc-page.component.html',
  styleUrls: ['./poc-page.component.css']
})
export class PocPageComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => console.log(params)); // Object {}
  }

  ngOnInit() {
  }

}
