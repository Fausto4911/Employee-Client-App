import { Injectable } from '@angular/core';
import { Employee } from '../model/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeValidatorService {
  // Validaciones: Atributos vacios, formato incorrectos, cedula repetida, y cualquier otro conveniente.
  
  iDList: number[];
  
  constructor() { }



isEmployeeRowValid(emp : Employee) : boolean {

if(!this.validateId(emp)) {
  console.error('There are invalid Ids!');
  return false;
}


if(!this.validateName(emp)) {
  console.error('There are Invalid Names !');
  return false;
}


if(!this.validateLastName(emp)) {
  console.error('There are Invalid Last Names !');
  return false;
}


if(!this.validateNumber(emp)) {
  console.error('There are Invalid Numbers !');
  return false;
}


if(!this.validateDepartment(emp)) {
  console.error('There are Invalid Departments !');
  return false;
}

  return true;

}

validateId(emp: Employee): boolean {
  if (emp.iD === undefined) {
    return false;
  }

  let num = Number(emp.iD);
  if(isNaN(num)) return false;

  return true;
}

validateName(emp: Employee): boolean {
  if (emp.name === undefined) {
    return false;
  }
  return true;
}

validateLastName(emp: Employee): boolean {
  if (emp.lastName === undefined) {
    return false;
  }
  return true;
}

validateNumber(emp: Employee): boolean {
  if (emp.number === undefined) {
    return false;
  }

  let num = Number(emp.number);
  if(isNaN(num)) return false;

  return true;
}

validateDepartment(emp: Employee): boolean {
  if (emp.department === undefined) {
    return false;
  }
  return true;
}

}
