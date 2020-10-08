import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { EmployeeService } from './../../services/employee.service';
import { Employee } from './../../model/employee.model';

const EMPLOYEE_EXCEL_FILE_NAME = 'Employees';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {

  showTableHeader : boolean;

  employees: Employee[];
   
  headers: string[];

  spinnerFlag: boolean;

  spinnerFlagDownload: boolean;

  constructor(private employeeService: EmployeeService) { 
   
  }

  ngOnInit(): void {
  }

  onFileChange(event: any) {
    const target : DataTransfer = <DataTransfer> (event.target);
    
    if(target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => this.loadEmployees(e);
    reader.readAsBinaryString(target.files[0]);
}

  loadEmployees(e : any): void {
    let data : [][] = this.employeeService.readDataFromExel(e); 
    if(!this.employeeService.areIdsValid(data)) {
      console.error('There are two or more IDs equals !');
    }
    this.headers = this.employeeService.getHeadersFromExcel(data);
    this.employees = this.employeeService.validateAndCreateLEmployeesFromExcel(data);
    if(this.employees) this.showTableHeader = true;
}

  saveEmployees() :void {
    this.spinnerFlag = true;
     this.employeeService.saveAllEmployees(this.employees, (result: boolean, employeesSaved: Employee[]) => {
      this.spinnerFlag =false;
      if(result) {
        console.log('Employees succes saved');
        this.employees = employeesSaved;
      } else {
            console.error('Error saving Employees');
      }
      
    });
  }

  downloadAsExcel() :void {
    this.spinnerFlagDownload = true;
    this.employeeService.exportAsExcelFile(this.employees, EMPLOYEE_EXCEL_FILE_NAME, (result:boolean) => {
      this.spinnerFlagDownload =false;
    });
  }

}
