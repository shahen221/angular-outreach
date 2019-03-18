import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-createbulkregistration',
  templateUrl: './createbulkregistration.component.html',
  styleUrls: ['./createbulkregistration.component.css']
})
export class CreatebulkregistrationComponent implements OnInit {

  
  arrayBuffer:any;
  file:File;
  incomingfile(event) 
    {
    this.file= event.target.files[0]; 
    }
  constructor() { }

  ngOnInit() {
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
          console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
      }
      fileReader.readAsArrayBuffer(this.file);
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
