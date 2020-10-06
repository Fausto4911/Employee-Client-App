import { Injectable } from '@angular/core';
import { Employee } from './../model/employee.model';

@Injectable()
export class EmployeeService {
    constructor(){
        console.log('employee service ready');
    }

    validateAndCeateLEmployeesFromExcel (data : [][]) : Employee [] {
        let employees: Employee[] = new Array();
        
        for(var i = 0; i < data.length; i++) {
            var row = data[i];
            // console.log(row[0]);
            if(row.length < 5) {
                throw new Error('Faltan Columnas');
            }

            let id : number;
            let name: string;
            let lastName: string;
            let employeeNumber: string;
            let department:string; 
            let index = 0;
            for(var j = 0; j < row.length; j++) {
                if(j === 0) id = row[index];
                if(j === 1) name = row[index];
                if(j === 2) lastName = row[index];
                if(j === 3) employeeNumber = row[index];
                if(j === 4) department = row[index];
                 index ++;
            }
            employees.push(new Employee(id, name, lastName, employeeNumber, department));
            
        }

        employees.shift();
        return employees;
    }
}