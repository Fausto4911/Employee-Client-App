import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/model/employee.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  employees: Employee[];

  showTableHeader : boolean;

  headers: string[];
  
  constructor() { }

  ngOnInit(): void {
  }

}
