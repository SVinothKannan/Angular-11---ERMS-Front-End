import { AfterContentChecked, AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { event } from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { CommentsModel } from 'src/app/Models/CommentsModel.Model';
import { ERMSServices } from 'src/app/Services/ermsservices.service';
import { ButtonRendererComponent } from '../Employee/ButtonRenderer.component';

@Component({
    templateUrl: './Login.component.html',
    styles:[`.is-invalid{border:2px solid red !important;`]
  })
export class LoginComponent implements OnInit
{   loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
   
    constructor(private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,private ermservices:ERMSServices,private SpinnerService: NgxSpinnerService){
            if (this.ermservices.currentUserValue) { 
                this.router.navigate(['/']);
            }
    }


    ngOnInit(): void {
        let emailRegEx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        this.loginForm = this.formBuilder.group({
            UserName: ['', [Validators.required,Validators.email,Validators.pattern(emailRegEx)]],
            Password: ['', [Validators.required,Validators.minLength(6)]]
        });
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'Home';
    }

    get f() { return this.loginForm.controls; }


    onSubmit() {
        this.submitted = true;
        this.SpinnerService.show();  
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;

        var UserDetails=JSON.stringify(this.loginForm.value);
        setTimeout(()=>{
            this.ermservices.UserAuthentication(UserDetails)
            .pipe(first())
            .subscribe(
                data => {
                    debugger
                    this.router.navigate(['Home']);this.SpinnerService.hide();  
                },
                error => {
                    this.error = error;
                    this.loading = false;this.SpinnerService.hide();  
           });
        },1000)
    }

}