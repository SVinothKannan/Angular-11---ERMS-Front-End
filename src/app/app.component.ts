import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ERMSServices } from './Services/ermsservices.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Employee Record Management System';
  User:string="Vinoth S";
  users:any;
  public IsLoggedin:boolean=false;
  currentUser: any;
  constructor(private appService: ERMSServices,private route: ActivatedRoute,private router : Router)
  { debugger
    this.appService.currentUser.subscribe(
    (x)=>{  
             if(x!=null&&x!=undefined)
             {
                this.IsLoggedin=true;  
                this.User=x.EmpName;
             }
       });
  }
  ngOnInit(): void {
  }
  LogOut()
  { var confirmation = confirm("Are you sure you want to Log out from the application?");  
  if(confirmation){
    this.appService.logout();
    this.IsLoggedin=false;
    this.router.navigate(['Login']);}
  }
}
