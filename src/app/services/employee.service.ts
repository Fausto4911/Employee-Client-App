import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from './../model/employee.model';
import { EmployeeValidatorService } from './employee-validator.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8;';
const EXCEL_EXTENSION = '.xlsx';
const EMPLOYEE_SAVE_URL = 'http://localhost:8080/employees/all';

@Injectable({
    providedIn: 'root'
  })
export class EmployeeService {

    constructor(private http : HttpClient, private validator: EmployeeValidatorService){
    }

    getHeadersFromExcel(data :  [][]) : string[] {
        let headers: string []  = new Array();
        for(let i = 0; i < data.length; i++) {
            let row = data[i];
            if(i === 0) {
              row.forEach(x => headers.push(x));
              return headers;
            }
        }
        return headers;
    }
    
    validateAndCreateLEmployeesFromExcel (data :  [][]) : Employee [] {
        let employees: Employee[] = new Array();
        
        for(let i = 0; i < data.length; i++) {
            let row = data[i];
            if(i === 0) {
            } else {

                let id : number;
                let name: string;
                let lastName: string;
                let number: string;
                let department:string; 
                let index = 0;
                for(let j = 0; j < row.length; j++) {
                    if(j === 0) id = row[index];
                    if(j === 1) name = row[index];
                    if(j === 2) lastName = row[index];
                    if(j === 3) number = row[index];
                    if(j === 4) department = row[index];
                     index ++;
                }
                let employee = new Employee(id, name, lastName, number, department);
                
                    if(this.validator.isEmployeeRowValid(employee)) 
                        employees.push(employee);
            }
            
            
        }

        return employees;
    }

    saveAllEmployees(employees : Employee [], callBack: any): void {
                 this.http.post<Employee>(EMPLOYEE_SAVE_URL, employees)
                 .subscribe({
        next: response => {
            console.log(response);
            console.log('success');
            callBack(true, response);
        },
        error: error => {
            console.error('There was an error !', error);
            callBack(false, error);
        }
    });
    }

    areIdsValid(data :  [][]) : boolean {
        for(let i = 0; i < data.length; i++) {
            let row = data[i];

            //check for duplication in IDs
            let sorted_arr = row.slice().sort(); 
            for (let i = 0; i < sorted_arr.length - 1; i++) {
              if (sorted_arr[i + 1] == sorted_arr[i]) {
                return false;
              }
            }

        }
        return true;
    }

    exportAsExcelFile(json: any[], excelFileName: string, callBack: any) : void {
        const worksheet:  XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet}, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type:'array' });
        this.saveAsExcelFile(excelBuffer, excelFileName);
        callBack(true);
    }

    saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }

    readDataFromExel(e: any) : [][] {
      const bstr : string = e.target.result; 
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      let data : [][] = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
      return data;
    }
}