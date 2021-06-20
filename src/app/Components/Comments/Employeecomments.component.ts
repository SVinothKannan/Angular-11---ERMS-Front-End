import { AfterContentChecked, AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { event } from 'jquery';
import { Observable } from 'rxjs';
import { CommentsModel } from 'src/app/Models/CommentsModel.Model';
import { ERMSServices } from 'src/app/Services/ermsservices.service';
import { ButtonRendererComponent } from '../Employee/ButtonRenderer.component';

@Component({
    selector: 'app-root',
    templateUrl: './Employeecomments.component.html',
    styles:[`.header-color-modal {
      padding:9px!important;
      color: #fff;
    }.is-invalid{border:2px solid red !important;`]
  })
export class Employeecomments implements OnInit,AfterViewInit
{   @ViewChildren('myModal') myModal: QueryList<ElementRef>;
    @ViewChild('closeBtn') closeBtn: ElementRef;
    EmpIddet:any=0;
    CommentsForm: FormGroup;
    CommentsModeldata:CommentsModel;
    submitted = false;
    EmployeesList:any;
    AuthorsList:any;
    CommentsList:any;
    CommentsModels:CommentsModel;
    activePage:number = 0; 
    totalrecords:number;
    recordsPerPage:number;
    first:number;last:number;
    IntialValue:number;
    constructor(private ERMSService:ERMSServices,private formBuilder: FormBuilder){
      this.recordsPerPage=5;
      this.IntialValue=5;
    }
    
    displayActivePage(activePageNumber:number){  
      debugger
      if(activePageNumber==1){
        this.first=1;
        this.last=this.first+this.IntialValue-1;
      }
      else{
        this.first=(activePageNumber*this.IntialValue)-this.IntialValue+1;
        this.last=(this.first+this.IntialValue)-1;
      }
      
      this.activePage = activePageNumber;
      this.GetComments(); 
      let scrollToTop = window.setInterval(() => {
        let pos = window.pageYOffset;
        if (pos > 0) {
            window.scrollTo(0, pos - 20); // how far to scroll on each step
        } else {
            window.clearInterval(scrollToTop);
        }
    }, 16);
    }
 
    ngAfterViewInit(): void {
      $.getScript('../../assets/js/chosen/chosen-active.js');
    }

    GetAuthorEmployees()
    {
     this.ERMSService.GetEmployees(true).subscribe((data)=>{
             debugger
             this.AuthorsList=data;
             console.log(this.AuthorsList);
     });
    }

    GetEmployees()
    {
     this.ERMSService.GetEmployees(false).subscribe((data)=>{
             debugger
             this.EmployeesList=data;
             console.log(this.EmployeesList);
     });
    }

    GetComments()
    {
      this.ERMSService.getAllComments(0,this.first,this.last,false).subscribe((data)=>{
        debugger
        if(data!=null&&data!==undefined){
          this.totalrecords=data[0]["counts"];
        this.CommentsList=data;
        console.log(this.CommentsList);
        }
      });
    }

    onSubmit()
    {
      this.submitted = true;

      if (this.CommentsForm.invalid) {
          return;
      }
       this.CommentsModeldata=this.CommentsForm.value;
       this.ERMSService.CreateComments(this.CommentsModeldata).subscribe((data)=>{
              alert(data.result);
              this.GetComments();
              if(data.result.indexOf("update"))
              {
                this.closeModal();
              }
       });
     
    }

    onCommentsButtonClick(params)
    {     
      this.myModal.map((elem) => { this.EmpIddet=params.data.empId;
        elem.nativeElement.click()
      })
      console.log("Loading html into iframe now")
    }

    Manage(id)
    {debugger
     this.ERMSService.getAllComments(id).subscribe((data)=>{
        this.CommentsForm.patchValue({
          EmpId:+data[0]["empId"],
          Author:data[0]["author"],
          Comments:data[0]["comments"],
          CommentsId:parseInt(data[0]["commentsId"])
        });
     }); 
     this.myModal.map((elem) => {
      elem.nativeElement.click()
    });
    }

   activeTab = 'search';

   search(activeTab){
     this.activeTab = activeTab;
   }
 
   result(activeTab){
     this.activeTab = activeTab;
   }
  

   get f() { return this.CommentsForm.controls; }
    ngOnInit(): void {
      this.CommentsForm = this.formBuilder.group({
        CommentsId:[0],
        EmpId: ['', Validators.required],
        Author: ['', Validators.required],
        Comments: ['', [Validators.required,Validators.maxLength(500)]],
      });
      this.GetEmployees();
      this.GetAuthorEmployees();this.GetComments();
    }
    CloseBox(){
     this.CommentsForm.reset();
     this.submitted=false;
     this.CommentsForm = this.formBuilder.group({
      CommentsId:[0],
      EmpId: ['', Validators.required],
      Author: ['', Validators.required],
      Comments: ['', [Validators.required,Validators.maxLength(500)]],
    });
    }

    private closeModal(): void {
      this.CloseBox();
      this.closeBtn.nativeElement.click();
  }

}