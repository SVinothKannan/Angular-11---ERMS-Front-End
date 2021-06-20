import { Component, OnInit } from "@angular/core";
import { ERMSServices } from "src/app/Services/ermsservices.service";
import * as $ from "jquery";
import { Observable } from "rxjs";
import { ButtonRendererComponent } from './ButtonRenderer.component';
import { Router } from "@angular/router";
@Component({
    selector: 'app-root',
    templateUrl: './EmployeeList.component.html',
    //  styleUrls: ['./Dtable.css']
  })
export class EmployeeList implements OnInit
{
    public Employees:any;
    frameworkComponents: any;
    EmployeeNameFilterParams = {
      filterOptions: ['contains', 'notContains'],
      textFormatter: function (r) {
        if (r == null) return null;
        return r
          .toLowerCase()
          .replace(/[àáâãäå]/g, 'a')
          .replace(/æ/g, 'ae')
          .replace(/ç/g, 'c')
          .replace(/[èéêë]/g, 'e')
          .replace(/[ìíîï]/g, 'i')
          .replace(/ñ/g, 'n')
          .replace(/[òóôõö]/g, 'o')
          .replace(/œ/g, 'oe')
          .replace(/[ùúûü]/g, 'u')
          .replace(/[ýÿ]/g, 'y');
      },
      debounceMs: 200,
      suppressAndOrCondition: true,
    };
    public columnDefs = [{ field: "sno" }, { field: "empName",sortable: true,filterParams: this.EmployeeNameFilterParams,filter:true}, { field: "doj",sortable: true },{field:"jobTitle",sortable: true},{field:"address",sortable: true},{field:"departMent",sortable: true},{field:"salaryMonthly",sortable: true},{field:"salaryAnnually",sortable: true},
    {headerName:"Edit", cellRenderer: 'buttonRenderer',
    cellRendererParams: {
    onClick: this.onEditButtonClick.bind(this),
    label:'fa fa-edit'
    },},{headerName:"Delete", cellRenderer: 'buttonRenderer',
    cellRendererParams: {
    onClick: this.onDeleteButtonClick.bind(this),
    label: 'fa fa-trash'
    }}];
    rowData:Observable<any[]>;
    
    constructor(private ERMSService:ERMSServices,private router: Router)
    { this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
      }
    }

    GetAllEmployees()
    {
      this.rowData= this.ERMSService.getAllUsers();
    }

    ngOnInit(): void {
      this.GetAllEmployees();
    }

    onEditButtonClick(params)
    {
      this.router.navigate(['/NewEmployee'], { queryParams: { EmpId: params.data.empId } });
    }

    onDeleteButtonClick(params)
    { 
      var confirmation = confirm("Are you sure you want to do that?");  
      if(confirmation){
      this.ERMSService.DeleteEmployee(params.data.empId).subscribe
      ((data)=>{
                 if(data!=null&&data!=undefined)
                 {alert(data.result);} this.GetAllEmployees();

      });
    }
    }

}