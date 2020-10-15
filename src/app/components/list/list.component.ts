import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/model/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  employees: Employee[];

  showTableHeader : boolean;

  headers: string[];
  
  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
   this.employeeService.getEmployees().subscribe(data => {
     this.employees = data;
     this.showTableHeader = true;
   });
  }

}
