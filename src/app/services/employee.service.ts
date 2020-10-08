import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from './../model/employee.model';
import { EmployeeValidatorService } from './employee-validator.service';

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

    saveAllEmployees(employees : Employee []): void {
                 this.http.post<any>('http://localhost:8080/employees/all', employees)
                 .subscribe({
        next: response => {
            console.log(response);
            console.log('success');
        },
        error: error => {
            console.error('There was an error !', error);
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
}