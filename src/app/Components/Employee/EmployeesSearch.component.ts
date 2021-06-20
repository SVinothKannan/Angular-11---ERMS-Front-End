import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ERMSServices } from "src/app/Services/ermsservices.service";
import * as $ from "jquery";
import { Observable } from "rxjs";
import { ButtonRendererComponent } from './ButtonRenderer.component';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators  } from "@angular/forms";
import {Employeecomments} from "../Comments/Employeecomments.component"
import { DatePipe } from '@angular/common';
@Component({
    selector: 'app-root',
    templateUrl: './EmployeesSearch.component.html',
    styles:[`.is-invalid{border:2px solid red !important;`]
  })


  export class EmployeesSearch implements OnInit,AfterViewInit
  {
    SearchForm: FormGroup;
    submitted  =  false;
    EmployeesList:any;
    protected datePipe: DatePipe = new DatePipe('en-US');
    Date1:any;
    Date2:any;
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
    label:'fa fa-trash'
    }}];
    rowData:Observable<any[]>;
  
    constructor(private ERMSService:ERMSServices,private formBuilder: FormBuilder,private router: Router){   
      this.frameworkComponents = {
        buttonRenderer: ButtonRendererComponent,
        }
        this.GetEmployees();
    }

    GetFirstDayMonth(){
      let Datevalue = new Date();
      var firstdate = new Date(Datevalue. getFullYear(), Datevalue. getMonth(), 1);
      this.Date1 = this.datePipe.transform(firstdate, 'yyyy-MM-dd');
    }

    GetLastDayMonth(){
      let Datevalue = new Date();
      var enddate = new Date(Datevalue. getFullYear(), Datevalue. getMonth()+1,0);
      this.Date2= this.datePipe.transform(enddate, 'yyyy-MM-dd');
    }
    
  ngAfterViewInit(): void {

  }
    GetEmployees()
    {
     this.ERMSService.GetEmployees(false).subscribe((data)=>{
             debugger
             this.EmployeesList=data;
             console.log(this.EmployeesList);
     });
    }
    ngOnInit(): void {
      this.SearchForm  =  this.formBuilder.group({
        EmpId: [0],
        JobTitle: ['', Validators.required],
        DepartMent: ['', Validators.required],
        StartDate:[this.Date1],
        EndDate:[this.Date2],
    });
    this.GetFirstDayMonth();
    this.GetLastDayMonth();
    this.SearchForm.patchValue({
      EmpId:0,
      JobTitle:'',
      DepartMent:'',
      StartDate:this.Date1,
      EndDate:this.Date2,
  });
  this.Searchfilter();
    }
      
    get f() { return this.SearchForm.controls; }

    Searchfilter(){
      debugger
      let FilterValue=JSON.stringify(this.SearchForm.value);
      this.rowData=this.ERMSService.GetEmployeesFilter(FilterValue);
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
                 {alert(data.result);} this.Searchfilter();

      });
    }
  }
}