import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{AddEmployeeComponent}from '../app/Components/Employee/AddEmployee.component'
import { Employeecomments } from './Components/Comments/Employeecomments.component';
import { EmployeeList } from './Components/Employee/Employeelist.component';
import { EmployeesSearch } from './Components/Employee/EmployeesSearch.component';
import { Homecomponent } from './Components/Home/Home.component';
import { Printcomponent } from './Components/Printing/Print.component';
import { ProfilesComponent } from './Components/Profiles/Profiles.component';
import { ViewProfileComponent } from './Components/Profiles/ViewProfiles/ViewProfile.component';
import { LoginComponent } from './Components/Security/Login.component';
import { PageNotFoundComponent } from './Components/Security/Pnf.component';
import{AuthGuard} from './Guards/Auth.guard';

const routes: Routes = [{path:'Home',component:Homecomponent, canActivate: [AuthGuard] },
                        {path:'', pathMatch: 'full', redirectTo: 'Login'},
                        {path:'Login', component: LoginComponent,canActivate: [AuthGuard]},
                        {path:'Profiles', component: ProfilesComponent,canActivate: [AuthGuard]},
                        {path:'ViewProfile/:empId', component: ViewProfileComponent,canActivate: [AuthGuard]},
                        {path:'Print', component: Printcomponent,canActivate: [AuthGuard]},
                        {path:'NewEmployee',component:AddEmployeeComponent,canActivate: [AuthGuard]},                     
                        {path:'EmployeeList',component:EmployeeList,canActivate: [AuthGuard]},
                        {path:'Comments',component:Employeecomments,canActivate: [AuthGuard]},
                        {path:'EmployeeSearch',component:EmployeesSearch,canActivate: [AuthGuard]},
                        {path: '**', component: PageNotFoundComponent}
                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
