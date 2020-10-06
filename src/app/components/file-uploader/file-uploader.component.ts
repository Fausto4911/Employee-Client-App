import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { EmployeeService } from './../../services/employee.service';
import { Employee } from './../../model/employee.model';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {

  data: [][];
  
  employees: Employee[];

  constructor(private employeeService: EmployeeService) { 

  }

  ngOnInit(): void {
  }

  onFileChange(event: any){
    const target : DataTransfer = <DataTransfer> (event.target);
    if(target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr : string = e.target.result;

      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
      this.employees = this.employeeService.validateAndCeateLEmployeesFromExcel(this.data);
      console.log(this.employees);
    };


    reader.readAsBinaryString(target.files[0]);
}

}
