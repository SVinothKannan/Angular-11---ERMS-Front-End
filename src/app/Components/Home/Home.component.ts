import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ERMSServices } from "../../Services/ermsservices.service";

@Component({
    selector: 'app-root',
    templateUrl: './Home.component.html',
    styles:[`.is-invalid{border:2px solid red !important;`]
  })

  export class Homecomponent implements OnInit
  {
    User:string='';
    constructor(private ermservice:ERMSServices, private route: ActivatedRoute,
      private router: Router){
          this.User=this.ermservice.currentUserValue.EmpName;    
    }

    ngOnInit(): void {
        
    }
    newemp(){
       this.router.navigateByUrl('NewEmployee');
    }
    emplist(){
      this.router.navigateByUrl('EmployeeList');
    }
    EmployeeSearch(){
      this.router.navigateByUrl('EmployeeSearch');
    }
    Comments(){
      this.router.navigateByUrl('Comments');
    }
    Profiles()
    {
      this.router.navigateByUrl('Profiles');
    }
  }

