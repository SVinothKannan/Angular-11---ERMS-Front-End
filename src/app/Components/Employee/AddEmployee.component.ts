import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { ERMSServices} from 'src/app/Services/ermsservices.service';
import {AddEmployeeModel} from '../../Models/EmployeeModel.Model'
import { ActivatedRoute, Params,Router } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './AddEmployee.component.html',
  styles:[".is-invalid{border:1px solid red !important;"]
})

export class AddEmployeeComponent implements OnInit {
  title = 'immedisassignment';
  User:string="Vinoth S";
  EmpId:number;
  EmployeeModel:AddEmployeeModel;
  protected datePipe: DatePipe = new DatePipe('en-US')
  constructor(private ERMSService:ERMSServices,private route: ActivatedRoute,private router : Router){
    this.EmployeeModel=new AddEmployeeModel(0,'',new Date().toDateString(),'','',0,0,'',false,true);
    debugger
   
  }

  ngOnInit(): void {
    debugger
    this.EmpId = (this.route.snapshot.queryParams.EmpId!=undefined)?+this.route.snapshot.queryParams.EmpId:+0;
    if(this.EmpId!=undefined&&this.EmpId!=0){
    this.ERMSService.getAllUsers(this.EmpId).subscribe(
      (data)=> {debugger
               if(data!=null||data!=undefined){
                let yesterday = new Date(data[0].doj);
                yesterday.setDate(yesterday.getDate()-1);
                var dates = this.datePipe.transform(yesterday, 'yyyy-MM-dd');
                this.EmployeeModel=new AddEmployeeModel(data[0].empId,data[0].empName,dates,data[0].jobTitle,data[0].departMent,data[0].salaryMonthly,data[0].salaryAnnually,data[0].address,data[0].isLineManager,data[0].isActive);
              }
      }
   );
    }
  }

  onSubmit(EmployeeModel:NgForm)
  {
     this.ERMSService.CreateEmployee(JSON.stringify(EmployeeModel.value)).subscribe(
       (data)=> {
                if(data!=null&&data.result!=''){
                 alert(data.result);
                }
       }
    );
  }

  Clear(EmployeeModel:NgForm)
  {
    this.EmployeeModel=new AddEmployeeModel(0,'',new Date().toDateString(),'','',0,0,'',false,true);
    EmployeeModel.resetForm();
    this.router.navigateByUrl('/EmployeeList');
  }
}

