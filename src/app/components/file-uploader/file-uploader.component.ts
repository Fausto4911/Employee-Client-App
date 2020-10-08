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

  showTableHeader : boolean;

  employees: Employee[];
   
  headers: string[];

  constructor(private employeeService: EmployeeService) { 
   
  }

  ngOnInit(): void {
  }

  onFileChange(event: any){
    const target : DataTransfer = <DataTransfer> (event.target);
    
    if(target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => this.loadEmployees(e);
    reader.readAsBinaryString(target.files[0]);
}

loadEmployees(e : any): void {
  const bstr : string = e.target.result;
  const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});
  const wsname: string = wb.SheetNames[0];
  const ws: XLSX.WorkSheet = wb.Sheets[wsname];
  let data : [][] = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
  if(!this.employeeService.areIdsValid(data)) {
    console.error('There are two or more IDs equals !');
  }
  this.headers = this.employeeService.getHeadersFromExcel(data);
  this.employees = this.employeeService.validateAndCreateLEmployeesFromExcel(data);
  if(this.employees) this.showTableHeader = true;
}

saveEmployees() :void {
  this.employeeService.saveAllEmployees(this.employees);
}

}
