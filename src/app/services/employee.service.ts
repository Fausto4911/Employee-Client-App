import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from './../model/employee.model';

@Injectable({
    providedIn: 'root'
  })
export class EmployeeService {

    constructor(private http : HttpClient){
        console.log('employee service ready');
        this.getAllEmployees();
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
            let number: string;
            let department:string; 
            let index = 0;
            for(var j = 0; j < row.length; j++) {
                if(j === 0) id = row[index];
                if(j === 1) name = row[index];
                if(j === 2) lastName = row[index];
                if(j === 3) number = row[index];
                if(j === 4) department = row[index];
                 index ++;
            }
            employees.push(new Employee(id, name, lastName, number, department));
            
        }

        employees.shift();
        return employees;
    }

    getAllEmployees(): Employee[] {

        this.http.get('http://localhost:8080/employees')
            .subscribe( (response: any ) => {
              console.log(response);
            });
        return [];

    }

    saveAllEmployees(employees : Employee []): void {
        // this.http.post<any>('https://jsonplaceholder.typicode.com/posts', { title: 'Angular POST Request Example' }).subscribe(data => {
    // this.postId = data.id;
// })
       console.log('saving employees');
       this.http.post<any>('http://localhost:8080/employees/all', employees )
                 .subscribe((response: any) => {
                     console.log('save response');
                     console.log(response);
                 });
    }
}