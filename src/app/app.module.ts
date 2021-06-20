import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEmployeeComponent } from './Components/Employee/AddEmployee.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './Services/APIInterceptor.Interceptor';
import { ERMSServices } from './Services/ermsservices.service';
import { PhoneNumberValidatorDirective } from './Directives/CustomDirectiveValidation.Directive';
import { EmployeeList } from './Components/Employee/Employeelist.component';
import { AgGridModule } from 'ag-grid-angular';
import { DatePipe } from '@angular/common';
import { Employeecomments } from './Components/Comments/Employeecomments.component';
import { EventStopPropagation } from './Directives/EventStopPropagation.Directive';
import { A11yModule } from '@angular/cdk/a11y';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { OverlayModule } from '@angular/cdk/overlay';
import { EmployeesSearch } from './Components/Employee/EmployeesSearch.component';
import { LoginComponent } from './Components/Security/Login.component';
import { ErrorInterceptor } from './Services/error.interceptors';
import { Homecomponent } from './Components/Home/Home.component';
import { AppPaginationComponent } from './Components/app-pagination/app-pagination.component';
import { applySourceSpanToExpressionIfNeeded } from '@angular/compiler/src/output/output_ast';
import { PageNotFoundComponent } from './Components/Security/Pnf.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ProfilesComponent } from './Components/Profiles/Profiles.component';
import { Printcomponent } from './Components/Printing/Print.component';
import { ViewProfileComponent } from './Components/Profiles/ViewProfiles/ViewProfile.component';



@NgModule({
  declarations: [
    AppComponent, ProfilesComponent, ViewProfileComponent,
    AddEmployeeComponent, PhoneNumberValidatorDirective, Homecomponent, AppPaginationComponent, PageNotFoundComponent,
    EmployeeList, Employeecomments, EventStopPropagation, EmployeesSearch, LoginComponent, AppPaginationComponent, Printcomponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    OverlayModule,
    PortalModule,
    ScrollingModule, NgxSpinnerModule,
    AppRoutingModule, HttpClientModule, DataTablesModule, AgGridModule.withComponents([])
  ],
  exports: [A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    OverlayModule,
    PortalModule,
    ScrollingModule, ReactiveFormsModule, AppPaginationComponent],
  bootstrap: [AppComponent],
  providers: [DatePipe, ERMSServices, {
    provide: HTTP_INTERCEPTORS,
    useClass: ApiInterceptor,
    multi: true
  }, { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],

})
export class AppModule { }
